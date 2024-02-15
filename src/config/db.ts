import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    console.log("uriii mongo db::::::::::: ", process.env.DB_HOST);
    const conn = await mongoose.connect(process.env.DB_HOST as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};
