import { cleanEnv, port, str, url } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: port({ default: 8000 }),
  MONGO_URI: url(),
  NODE_ENV: str({
    choices: ["development", "production"],
    default: "development",
  }),
  ACCESS_SECRET_KEY: str({ minLength: 32 }),
  REFRESH_SECRET_KEY: str({ minLength: 32 }),
  CLIENT_URL: str({
    desc: "Frontend URL for CORS",
    default: "http://localhost:5173",
  }),
});
