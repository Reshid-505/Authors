import mongoose, { Mongoose } from "mongoose";

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

export const connectToDb = async (): Promise<void> => {
    if (connection.isConnected) {
      return;
    }

    const db: Mongoose = await mongoose.connect(process.env.DB_CONNETCTION_KEY as string);
    connection.isConnected = db.connections[0].readyState;

};