import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const options = {
      autoIndex: process.env.NODE_ENV !== "production",
      serverSelectionTimeoutMS: 5000,
    };
    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    console.log(`Database Connected Successfully:${conn.connection.host}`);

    if (process.env.NODE_ENV === "production") {
      console.log("AutoIndex is Disabled in production");
    }
    // Handle connection errors after initial connection
    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });

    // Handle graceful shutdown
    process.on("SIGINT", async () => {
      console.log("\nReceived SIGINT. Closing MongoDB connection...");
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  } catch (error) {
    console.log(`Error Connecting Database`, error);
    process.exit(1); // Exit process with failure
  }
};
