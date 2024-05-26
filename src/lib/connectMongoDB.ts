import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function connectMongoDB(): Promise<void> {
  if (connection.isConnected) {
    console.log("Alerady connected db");
    return;
  }

  try {
    const response = await mongoose.connect(process.env.MONGODB_URI!);

    connection.isConnected = response.connections[0].readyState;

    console.log("Connected Success DB");
  } catch (error) {
    console.log("DB connection fail", error);

    process.exit(1);
  }
}

export default connectMongoDB;
