import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/rdn-manager';
    const conn = await mongoose.connect(connUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // No salimos del proceso para permitir que el server corra aunque falle la DB inicialmente en local
  }
};

export default connectDB;
