import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "./env.js";

if (!DB_URI) {
  throw new Error(
    "Database URI is not defined in <development/production> enviroment variables"
  );
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to the database in ${NODE_ENV} mode`);
  } catch (error) {
    console.log("Error connecting to the database", error);
    process.exit(1);
  }
};

export default connectDB;
