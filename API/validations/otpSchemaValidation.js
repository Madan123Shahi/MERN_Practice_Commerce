export const sendOtpSchema = Joi.object({
  email: Joi.string().email().lowercase().optional(),

  phone: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .optional(),

  password: Joi.string().min(8).max(32).required(),
})
  .or("email", "phone")
  .messages({
    "object.missing": "Either email or phone is required",
  });

export const verifyOtpSchema = Joi.object({
  email: Joi.string().email().lowercase().optional(),

  phone: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .optional(),

  otp: Joi.string().length(6).pattern(/^\d+$/).required(),

  password: Joi.string().min(8).max(32).required(),
})
  .or("email", "phone")
  .messages({
    "object.missing": "Either email or phone is required",
  });
