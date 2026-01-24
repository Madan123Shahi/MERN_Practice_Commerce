import { z } from "zod";
import { phoneField, passwordField } from "../Utils/UserFields.js";

/* =====================================================
   LOGIN
===================================================== */

export const registerLoginSchema = z.object({
  phone: phoneField,
  password: passwordField,
});
