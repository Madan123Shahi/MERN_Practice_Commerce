// controllers/auth.controller.js
import { OTP } from "../models/OTP.Model.js";
import { User } from "../models/User.Model.js";
import AppError from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { generateOTP, hashOTP } from "../utils/OTP.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/Token.js";
import { hashToken } from "../utils/HashToken.js";

export const sendOTP = catchAsync(async (req, res, next) => {
  const { phone } = req.body;

  if (!phone) return next(new AppError("Phone is required", 400));

  // const userExists = await User.findOne({ phone });
  // if (userExists) {
  //   return next(new AppError("User already exists", 400));
  // }

  const otp = generateOTP();
  const hashedOTP = hashOTP(otp);
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

  await OTP.findOneAndUpdate(
    { phone },
    {
      phone,
      otp: hashedOTP,
      expiresAt,
    },
    { upsert: true },
  );

  console.log("OTP (dev only):", otp);

  res.status(200).json({
    status: "success",
    message: "OTP sent successfully",
    expiresAt,
    phone,
  });
});

export const verifyOTP = catchAsync(async (req, res, next) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return next(new AppError("Phone & OTP required", 400));
  }

  const otpRecord = await OTP.findOne({ phone });
  if (!otpRecord) {
    return next(new AppError("OTP expired or not found", 400));
  }

  // Too many attempts
  if (otpRecord.attempts >= 5) {
    await OTP.deleteOne({ phone });
    return next(new AppError("Too many attempts", 429));
  }

  // Expired OTP
  if (Date.now() > otpRecord.expiresAt.getTime()) {
    await OTP.deleteOne({ phone });
    return next(new AppError("OTP expired", 400));
  }

  // Invalid OTP (hashed)
  if (hashOTP(otp) !== otpRecord.otp) {
    otpRecord.attempts++;
    await otpRecord.save();
    return next(new AppError("Invalid OTP", 401));
  }

  // const user = await User.create({
  //   phone,
  //   isVerified: true,
  // });
  // CHECK IF USER EXISTS
  let user = await User.findOne({ phone });

  // CREATE USER ONLY IF NOT EXISTS
  if (!user) {
    user = await User.create({ phone });
  }

  await OTP.deleteOne({ phone });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  user.refreshToken = hashToken(refreshToken);
  await user.save();

  // Send refresh token Using httpOnly cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const safeUser = {
    id: user._id,
    phone: user.phone,
  };

  res.status(200).json({
    status: "success",
    message: "OTP verified",
    safeUser,
    accessToken,
  });
});

export const resendOTP = catchAsync(async (req, res, next) => {
  const { phone } = req.body;
  if (!phone) return next(new AppError("Phone Field is required", 400));
  const otpRecord = await OTP.findOne({ phone });
  if (!otpRecord) {
    // create a helper () send and save OTP
    await sendAndSaveOtp();
    return res.status(200).json({ message: "" });
  }
  const now = Date.now();
  // Min Cooldown Seconds
  if (
    otpRecord.lastSentAt &&
    now - otpRecord.lastSentAt.getTime() <= 2 * 60 * 1000
  ) {
    return next(new AppError("Wait before requesting new OTP ", 429));
  }

  // Max Resend Count
  if (otpRecord.resendCount >= 3) {
    return next(new AppError("OTP Resend"));
  }

  // Generate & save new OTP
  const newOTP = generateOTP();
  otpRecord.otp = hashOTP(newOTP);
  otpRecord.resendCount += 1;
  otpRecord.lastSentAt = new Date();
  otpRecord.expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await otpRecord.save();

  await sendOTP(phone, newOTP);

  res.status(200).json({
    message: "OTP resent successfully",
  });
});

export const refreshToken = catchAsync(async (req, res, next) => {
  // 1️⃣ Get refresh token from cookie
  const refreshTokenFromCookie = req.cookies?.refreshToken;

  if (!refreshTokenFromCookie) {
    return next(new AppError("Refresh token missing", 401));
  }

  // 2️⃣ Verify refresh token (JWT validation)
  const decoded = verifyRefreshToken(refreshTokenFromCookie);
  if (!decoded) {
    return next(new AppError("Invalid or expired refresh token", 401));
  }

  // 3️⃣ Find user & explicitly select refreshToken
  const user = await User.findById(decoded.id).select("+refreshToken");
  if (!user || !user.refreshToken) {
    return next(new AppError("User not authorized", 401));
  }

  // 4️⃣ Compare hashed refresh token
  const incomingHashedToken = hashToken(refreshTokenFromCookie);

  if (incomingHashedToken !== user.refreshToken) {
    return next(new AppError("Refresh token mismatch", 401));
  }

  // 5️⃣ Generate NEW access token
  const newAccessToken = generateAccessToken(user._id);

  // (Optional but recommended) 🔁 Refresh token rotation
  const newRefreshToken = generateRefreshToken(user._id);
  user.refreshToken = hashToken(newRefreshToken);
  await user.save();

  // 6️⃣ Set new refresh token cookie
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // 7️⃣ Send new access token
  res.status(200).json({
    status: "success",
    accessToken: newAccessToken,
  });
});

export const logout = async (req, res) => {
  res.clearCookie("refreshToken");
  await User.findByIdAndUpdate(req.user, { refreshToken: null });
  res.status(200).json({ message: "Logged out" });
};

// Needed so frontend can fetch user after refresh
export const getMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ user });
});
