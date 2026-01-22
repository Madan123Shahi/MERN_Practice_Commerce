import { z } from "zod";

// Reusable fields
export const userField = z
  .string()
  .trim()
  .min(2, "Username must be at least 2 characters")
  .max(50, "Username must be less than 50 characters");

export const emailField = z.email("Invalid Email ID").toLowerCase().trim();

export const phoneField = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format");

export const passwordField = z
  .string()
  .min(12, "Password must be at least 12 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    "Password must contain at least one special character",
  )
  .regex(/^\S+$/, "Password must not contain spaces");

// REGISTER schema
export const registerSchema = z
  .object({
    email: emailField.optional(),
    phone: phoneField.optional(),
    password: passwordField,
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone is required",
  });

// LOGIN schema
export const loginSchema = z
  .object({
    email: emailField.optional(),
    phone: phoneField.optional(),
    password: passwordField,
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone is required",
  });

// UPDATE schema
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
