import { z } from "zod";
import { otpField } from "../Utils/OtpFields.js";

/* =====================================================
   LOGIN
===================================================== */

export const verifyOtpSchema = z.object({
  otp: otpField,
});
