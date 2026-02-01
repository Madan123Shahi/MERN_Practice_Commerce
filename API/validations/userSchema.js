import { z } from "zod";

/** * Reusable Fields
 */
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

const otpField = z
  .string()
  .length(6, "OTP must be exactly 6 digits")
  .regex(/^\d+$/, "OTP must contain only numbers");

/** * Exported Schemas
 */

// Step 1: Initial phone submission
export const startRegisterSchema = z.object({
  phone: phoneField,
});

// Step 2: OTP Verification
export const verifyOTPSchema = z.object({
  phone: phoneField,
  otp: otpField,
});

// Step 3: Account Completion
export const completeRegisterSchema = z
  .object({
    phone: phoneField,
    firstName: z.string().min(2, "First name is too short").max(50),
    lastName: z.string().min(1, "Last name is required").max(50),
    email: z.email("Invalid email address"),
    password: passwordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Sets the error to the confirmPassword field
  });
