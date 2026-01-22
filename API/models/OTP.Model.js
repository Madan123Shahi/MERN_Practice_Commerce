import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: String,
    phone: String,
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },

  { timestamps: true },
);

otpSchema.index({ email: 1 }, { unique: true, sparse: true });
otpSchema.index({ phone: 1 }, { unique: true, sparse: true });
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OTP = mongoose.model("OTP", otpSchema);
