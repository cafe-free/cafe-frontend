import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

const connection: { isConnected?: number } = {};

async function connectMongoDb() {
    if (connection.isConnected) return;

    const db = await mongoose.connect(MONGODB_URI!);
    connection.isConnected = db.connections[0].readyState;

    console.log("Connect to db");

}

export default connectMongoDb;