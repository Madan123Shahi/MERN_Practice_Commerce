import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL, {
  enableOfflineQueue: false,
  maxRetriesPerRequest: 3,
  connectTimeout: 10_000,
});

redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("ready", () => {
  console.log("🚀 Redis ready to use");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

export default redis;
