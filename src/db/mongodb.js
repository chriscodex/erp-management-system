import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const { MONGODB_URI } = process.env;

    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI must be defined in .env.local');
    }

    const { connection } = await mongoose.connect(MONGODB_URI, {
      dbName: 'motorock',
    });
    if (connection.readyState === 1) {
      console.log('MongoDB connected');
      return true;
    }
  } catch (error) {
    console.log('Error', error);
    throw error;
  }
};
