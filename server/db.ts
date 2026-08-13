import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(uri, {
      dbName: 'autoconfiance' // Explicitly use the 'autoconfiance' database
    });
    console.log('MongoDB Connected Successfully to autoconfiance');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    // process.exit(1); // Don't kill the server in serverless environment
  }
};

export default connectDB;
