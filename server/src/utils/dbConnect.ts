import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/rdn-manager';
    // const conn = await mongoose.connect(connUrl);
    // console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.warn("MongoDB bypass: Using in-memory mode (Mongoose not connected to real DB)");
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    // process.exit(1);
  }
};

export default connectDB;
