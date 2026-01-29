import { z } from "zod";

export const otpField = z
  .string()
  .trim()
  .length(6, { message: "OTP must be exactly 6 digits" })
  .regex(/^\d{6}$/, { message: "OTP must contain only numbers" });
