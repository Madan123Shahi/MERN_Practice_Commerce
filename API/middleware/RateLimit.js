import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redis from "./redis.js";

// Common handler for all rate limits
const rateLimitHandler = (req, res) => {
  return res.status(429).json({
    success: false,
    message: "Too many requests. Please try again later.",
  });
};

// Global fallback limiter (protect all routes)
export const globalLimiter = rateLimit({
  store: new RedisStore({ sendCommand: (...args) => redis.call(...args) }),
  windowMs: 60 * 1000, // 1 minute
  max: 100, // max requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

// SEND OTP — prevent SMS/email bombing
export const sendOTPLimiter = rateLimit({
  store: new RedisStore({ sendCommand: (...args) => redis.call(...args) }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 OTP requests
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

// VERIFY OTP — prevent brute-force OTP guessing
export const verifyOTPLimiter = rateLimit({
  store: new RedisStore({ sendCommand: (...args) => redis.call(...args) }),
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

// REFRESH TOKEN — prevent token abuse
export const refreshTokenLimiter = rateLimit({
  store: new RedisStore({ sendCommand: (...args) => redis.call(...args) }),
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});
