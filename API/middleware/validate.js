import AppError from "../utils/AppError.js";

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const message = result.error.issues?.[0]?.message || "Invalid request data";

    return next(new AppError(message, 400));
  }

  req.body = result.data;
  next();
};
