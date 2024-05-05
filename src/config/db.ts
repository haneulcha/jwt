import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();
const MONGO_DB_CONNECTION = process.env.MONGO_DB_CONNECTION;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_CONNECTION!, {});
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection failed");
  }
};
