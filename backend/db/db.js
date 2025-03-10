import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectToMongoDB() {
  const uri = process.env.DB_CONNECT;
  
  if (!uri) {
    console.error("MongoDB connection string (DB_CONNECT) is not defined in .env");
    return;
  }

  try {
    await mongoose.connect(uri);

    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

export default connectToMongoDB;
