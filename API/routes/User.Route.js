import express from "express";
const router = express.Router();
import { register } from "../controllers/User.Controller.js";
import { validate } from "../middleware/validate.js";
import { startRegisterSchema } from "../validations/userSchema.js";

router.post("/register", validate(startRegisterSchema), register);
export default router;
