import "./config/loadEnv.js";
import { env } from "./config/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/Database.js";
import userRoutes from "./routes/User.Route.js";
import { GlobalErrorHander } from "./middleware/GlobalError.js";
import AppError from "./utils/AppError.js";
import cors from "cors";

const app = express();

const PORT = env.PORT;

// ✅ CORS (Frontend connection)
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(GlobalErrorHander);

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
