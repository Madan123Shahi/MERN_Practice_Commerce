import express from "express";
const router = express.Router();
import {
  sendOTP,
  verifyOTP,
  getMe,
  refreshToken,
} from "../controllers/User.Controller.js";
import { validate } from "../middleware/validate.js";
import {
  startRegisterSchema,
  verifyOTPSchema,
} from "../validations/userSchema.js";

router.post("/send-otp", validate(startRegisterSchema), sendOTP);
router.post("/verify-otp", validate(verifyOTPSchema), verifyOTP);
router.get("/me", getMe);
router.get("/refresh-token", refreshToken);

export default router;
