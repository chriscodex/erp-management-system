import mongoose from 'mongoose';

import { CounterRepository } from '@/backend/counters/domain/repositories/counterRepository';

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
      // Inicializar la colección de contadores si no existe
      const counterRepository = new CounterRepository();
      await counterRepository.initializeCounters();
      return true;
    }
  } catch (error) {
    console.log('Error', error);
    throw error;
  }
};
