import { env } from "../config/env";
import AppError from "../utils/AppError";

// MongoDB errors
const handleCastError = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleDuplicateValues = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  return new AppError(
    `Duplicate value for ${field}: "${value}". Please use another value.`,
    400
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

// 🌍 Global Error Middleware
export const GlobalErrorHander = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // 🧪 DEVELOPMENT
  if (env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }

  // 🚀 PRODUCTION
  if (env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    // MongoDB
    if (err.name === "CastError") error = handleCastError(err);
    if (err.code === 11000) error = handleDuplicateValues(err);
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);

    // JWT
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

    return res.status(error.statusCode).json({
      status: error.status,
      message: error.isOperational
        ? error.message
        : "Something went wrong! Please try again later.",
    });
  }
};
