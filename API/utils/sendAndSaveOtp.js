import { sendOTP } from "../controllers/User.Controller.js";
import { OTP } from "../models/OTP.Model.js";
import { generateOTP, hashOTP } from "../utils/OTP.js";

export const sendAndSaveOtp = async (phone) => {
  const otp = await generateOTP();
  await OTP.create({
    phone,
    otp: hashOTP(otp),
    lastSentAt: new Date.now(),
    expiresAt: new Date(Date.now() + 2 * 60 * 1000),
  });
  await sendOTP(phone, otp);
};
