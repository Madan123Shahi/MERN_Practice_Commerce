import express from "express";
const router = express.Router();
import { register } from "../controllers/User.Controller.js";
import { validate } from "../middleware/validate.js";
import { registerSchema } from "../validations/userSchemaValidation.js";

router.post("/register", validate(registerSchema), register);
export default router;
