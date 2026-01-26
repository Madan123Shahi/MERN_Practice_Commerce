import { User } from "../models/User.Model.js";
import AppError from "./../utils/AppError.js";
import { catchAsync } from "./../utils/catchAsync.js";
import { generateOTP, hashOTP } from "./../utils/OTP.js";
import { OTP } from "./../models/OTP.Model.js";
import { startRegisterSchema } from "../validations/userSchema.js";

export const register = catchAsync(async (req, res, next) => {
  const parsed = startRegisterSchema.parse(req.body);
  const { phone } = parsed;

  if (!phone) return next(new AppError("Phone is required", 400));

  const existingUser = await User.findOne({ phone });
  if (existingUser) return next(new AppError("User already exists", 400));

  const otp = generateOTP();
  console.log("Generated OTP:", otp);

  const hashedOTP = hashOTP(otp);

  await OTP.findOneAndUpdate(
    { phone },
    {
      phone,
      otp: hashedOTP,
      expiresAt: Date.now() + 10 * 60 * 1000,
    },
    {
      upsert: true,
      new: true,
    },
  );

  res.status(200).json({
    status: "success",
    message: "OTP generated successfully",
    phone: phone,
  });
});

export const verifyOTP = catchAsync(async (req, res, next) => {
  const { phone, otp } = req.body;
});
