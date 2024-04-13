import mongoose from "mongoose";
// import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();
export const connectionToDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    // mongoose.set('toJSON', { getters: true });
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};
