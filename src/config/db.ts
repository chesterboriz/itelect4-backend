import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI is missing. Copy .env.example to .env and fill it in.",
    );
  }

  // 5 seconds timeout gives quick feedback if the Atlas connection string or IP whitelist fails
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log("MongoDB connected:", mongoose.connection.name);
}
