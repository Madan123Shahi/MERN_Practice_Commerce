import { z } from "zod";

export const userValidation = z.object({
  userField: z
    .string()
    .trim()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be less than 50 characters"),

  emailField: z.email("Invalid Email ID").toLowerCase(),

  phoneField: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  passwordField: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
});

// For creating a user (require at least email or phone) when optional is passing in above validation
// export const createUserSchema = userValidation.refine(
//   (data) => data.email || data.phone,
//   {
//     message: "Either email or phone is required",
//     path: ["email"],
//   },
// );

// Schema for CREATING a user (email OR phone required, password required)
export const registerSchema = z
  .object({
    userName: userField.optional(),
    email: emailField.optional(),
    phone: phoneField.optional(),
    password: passwordField,
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone is required",
  });

// For updating a user (all fields optional)
// export const updateUserSchema = userValidation.partial();

// Schema for login
export const loginSchema = z
  .object({
    email: emailField.optional(),
    phone: phoneField.optional(),
    password: passwordField,
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone is required",
  });

export const updateUserSchema = z
  .object({
    userName: userField.optional(),
    email: emailField.optional(),
    phone: phoneField.optional(),
    password: passwordField.optional(),
  })
  .refine(
    (data) => data.userName || data.email || data.phone || data.password,
    {
      message: "At least one field must be provided for update",
    },
  );
