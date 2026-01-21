import { env } from "../config/env";
import AppError from "../utils/AppError";
import { z } from "zod";

// MongoDB errors
const handleCastError = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleDuplicateValues = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  return new AppError(
    `Duplicate value for ${field}: "${value}". Please use another value.`,
    400,
  );
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new AppError(`Invalid input data. ${errors.join(". ")}`, 400);
};

// JWT errors
const handleJWTError = () =>
  new AppError("Invalid token. Please log in again.", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired. Please log in again.", 401);

// Zod Error
const handleZodError = (err) => {
  const formattedErrors = err.errors.map((error) => ({
    field: error.path.join(".") || "unknown",
    message: error.message,
  }));

  const error = new AppError("Validation failed", 400);
  error.errors = formattedErrors; // Attach formatted errors
  return error;
};

// 🌍 Global Error Middleware
export const GlobalErrorHander = (err, req, res, next) => {
  // Transform errors to AppError first
  let error = err;

  // Zod validation errors
  if (err instanceof z.ZodError) error = handleZodError(err);
  // MongoDB errors
  else if (err.name === "CastError") error = handleCastError(err);
  else if (err.code === 11000) error = handleDuplicateValues(err);
  else if (err.name === "ValidationError") error = handleValidationErrorDB(err);
  // JWT errors
  else if (err.name === "JsonWebTokenError") error = handleJWTError();
  else if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

  // Set defaults
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  // 🧪 DEVELOPMENT - More detailed response
  if (env.NODE_ENV === "development") {
    const response = {
      status: error.status,
      message: error.message,
      stack: error.stack,
    };

    // Include formatted errors if available (like Zod validation)
    if (error.errors) {
      response.errors = error.errors;
    }

    // Include full error object for debugging
    if (env.NODE_ENV === "development") {
      response.error = error;
    }

    return res.status(error.statusCode).json(response);
  }

  // 🚀 PRODUCTION - Cleaner response
  if (env.NODE_ENV === "production") {
    const response = {
      status: error.status,
      message: error.isOperational
        ? error.message
        : "Something went wrong! Please try again later.",
    };

    // Include formatted errors for validation failures
    if (error.errors && error.isOperational) {
      response.errors = error.errors;
    }

    return res.status(error.statusCode).json(response);
  }
};
