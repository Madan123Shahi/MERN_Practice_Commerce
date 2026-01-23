// validations/loginSchema.js
import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .superRefine((value, ctx) => {
      const looksLikePhone = /^[+\d\s\-()]+$/.test(value);
      const looksLikeEmail = value.includes("@");

      // User is trying to enter phone
      if (looksLikePhone) {
        if (!isValidPhoneNumber(value)) {
          ctx.addIssue({
            code: z.custom,
            message: "Enter a valid phone number",
          });
        }
        return;
      }

      // User is trying to enter email
      if (looksLikeEmail) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          ctx.addIssue({
            code: z.custom,
            message: "Enter a valid email address",
          });
        }
        return;
      }

      // Neither email nor phone
      ctx.addIssue({
        code: z.custom,
        message: "Enter a valid email or phone number",
      });
    }),

  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must contain at least: 1 uppercase, 1 lowercase, 1 digit, and 1 special character",
    ),
});
