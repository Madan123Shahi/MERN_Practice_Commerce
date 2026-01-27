import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateAccessToken = (payload) => {
  return jwt.sign({ id: payload }, env.ACCESS_SECRET_KEY, { expiresIn: "15m" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.ACCESS_SECRET_KEY);
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return null;
  }
};

export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    console.error("Token decode failed:", error);
    return null;
  }
};

export const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Failed to check token expiration:", error);
    return true;
  }
};

export const getTokenExpiry = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) return null;

    return new Date(decoded.exp * 1000); // Convert to Date object
  } catch (error) {
    console.error("Failed to get token expiry:", error);
    return null;
  }
};

export const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.decode(token);
    return decoded?.id || null;
  } catch (error) {
    console.error("Failed to get user ID from token:", error);
    return null;
  }
};

// Refresh Token

export const generateRefreshToken = (payload) => {
  return jwt.sign({ id: payload }, env.REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, env.REFRESH_SECRET_KEY);
  } catch (error) {
    console.error("Refresh token verification failed:", error.message);
    return null;
  }
};
