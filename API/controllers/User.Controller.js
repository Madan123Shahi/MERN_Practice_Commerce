import { User } from "../models/User.Model.js";
import AppError from "./../utils/AppError.js";
import { catchAsync } from "./../utils/catchAsync.js";
import { generateOTP, hashOTP } from "./../utils/OTP.js";
import { OTP } from "./../models/OTP.Model.js";

export const register = catchAsync(async (req, res, next) => {
  const { email, phone, password } = req.body;
  if ((!email && !phone) || !password)
    return next(
      new AppError("Email or Phone & Password field is required", 400),
    );

  const user = await User.findOne({
    $or: [{ email: email }, { phone: phone }],
  });

  if (user) return next(new AppError("User already exists", 400));
  const otp = generateOTP();
  console.log(`Generated OTP is:${otp}`);
  const hashedOTP = hashOTP(otp);

  await OTP.findOneAndUpdate(
    {
      $or: [{ email: email }, { phone: phone }],
    },
    {
      email,
      phone,
      otp: hashedOTP,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    },
    {
      upsert: true,
      new: true,
    },
  );
  res
    .status(200)
    .json({ status: "Success", message: "OTP generated Successfully" });
});
