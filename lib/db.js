import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default connectDB;