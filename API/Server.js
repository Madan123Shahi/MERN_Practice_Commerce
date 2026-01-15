import dotenv from "dotenv";
dotenv.config();
import { env } from "./config/env.js";
import express from "express";

const app = express();

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});
