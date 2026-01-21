import "./config/loadEnv.js";

import { env } from "./config/env.js";
import express from "express";
import { connectDB } from "./config/Database.js";

const app = express();

const PORT = env.PORT;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running at PORT: ${PORT}`);
    });
  } catch (error) {
    console.log(`Error Connecting Server`, error);
  }
};

start();
