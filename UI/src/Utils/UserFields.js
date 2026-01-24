import { z } from "zod";

export const phoneField = z
  .string()
  .min(1, "Phone number is required")
  .superRefine((value, ctx) => {
    // digits only
    if (!/^\d+$/.test(value)) {
      ctx.addIssue({
        code: z.custom,
        message: "Only digits are allowed",
      });
      return;
    }

    // first digit rule (LIVE)
    if (value.length >= 1 && !/^[6-9]/.test(value)) {
      ctx.addIssue({
        code: z.custom,
        message: "Phone number should start with 6, 7, 8, or 9",
      });
      return;
    }

    // final length rule
    if (value.length !== 10) {
      ctx.addIssue({
        code: z.custom,
        message: "Phone number must be exactly 10 digits",
      });
    }
  });

export const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    "Password must contain at least: 1 uppercase, 1 lowercase, 1 digit, and 1 special character",
  );
