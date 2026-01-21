// middlewares/validation.middleware.js
import { z } from "zod";

export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      // Validate request body against schema
      const validatedData = await schema.parseAsync(req.body);

      // Replace req.body with validated and sanitized data
      req.body = validatedData;

      next();
    } catch (error) {
      // Pass error to global error handler
      next(error);
    }
  };
};
