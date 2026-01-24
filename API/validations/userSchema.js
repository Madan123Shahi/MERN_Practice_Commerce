import { z } from "zod";

const phoneField = z
  .string()
  .trim()
  .regex(
    /^[6-9]\d{9}$/,
    "Phone number must be a valid 10-digit Indian mobile number",
  )
  .transform((phone) => `+91${phone}`);

const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password must be at most 64 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/[@$!%*?&#]/, "Password must contain at least one special character");

export const startRegisterSchema = z.object({
  phone: phoneField,
});
