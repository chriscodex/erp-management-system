import mongoose from 'mongoose';

import { CounterRepository } from '@/backend/counters/domain/repositories/counterRepository';

/**
 * Conecta a la base de datos MongoDB utilizando la URI proporcionada en las variables de entorno.
 * Lanza un error si la URI no está definida. Al establecer la conexión, inicializa la colección
 * de contadores si no existe. Devuelve true si la conexión se establece correctamente.
 *
 * @throws Error si la variable de entorno MONGODB_URI no está definida o si ocurre un error al conectar.
 */
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
