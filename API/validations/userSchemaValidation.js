import { z } from "zod";

export const userValidation = z.object({
  userName: z
    .string()
    .trim()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be less than 50 characters")
    .optional(),

  email: z.email("Invalid Email ID").toLowerCase().optional(),

  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
    .optional(),
});

// For creating a user (require at least email or phone)
export const createUserSchema = userValidationSchema.refine(
  (data) => data.email || data.phone,
  {
    message: "Either email or phone is required",
    path: ["email"], // or specify which field to attach error to
  },
);
