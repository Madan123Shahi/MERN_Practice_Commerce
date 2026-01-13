// validations/loginSchema.js
import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

const identifierSchema = z.string().refine((value) => {
  // Check if it's a phone number
  if (/^\+?[\d\s\-\(\)]+$/.test(value)) {
    return isValidPhoneNumber(value);
  }
  // Check if it's an email
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}, "Must be a valid email or phone number");

export const loginSchema = z.object({
  identifier: identifierSchema,
  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least: 1 uppercase, 1 lowercase, 1 digit, and 1 special character"
    ),
});
