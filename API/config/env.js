import { cleanEnv, port, str, url } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: port({ default: 8000 }),
  MONGO_URI: url(),
});
