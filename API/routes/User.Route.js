import express from "express";
const router = express.Router();
import { sendOTP, verifyOTP } from "../controllers/User.Controller.js";
import { validate } from "../middleware/validate.js";
import {
  startRegisterSchema,
  verifyOTPSchema,
} from "../validations/userSchema.js";

router.post("/send-otp", validate(startRegisterSchema), sendOTP);
router.post("/verify-otp", validate(verifyOTPSchema), verifyOTP);

export default router;
