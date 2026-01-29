import { z } from "zod";
import { otpField } from "../Utils/OtpFields.js";

/* =====================================================
   LOGIN
===================================================== */

export const verifySchema = z.object({
  otp: otpField,
});
