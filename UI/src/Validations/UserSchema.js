import { z } from "zod";
import { phoneField } from "../Utils/UserFields.js";

/* =====================================================
   LOGIN
===================================================== */

export const registerLoginSchema = z.object({
  phone: phoneField,
});
