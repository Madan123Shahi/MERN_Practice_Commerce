import { ZodError } from "zod";
import AppError from "../utils/AppError.js";

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return next(new AppError(error.issues[0].message, 400));
    }
  }
};
