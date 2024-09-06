import mongoose from 'mongoose';
import { User } from './user.js';
import bcryptjs from 'bcryptjs';

// Función para conectar a la base de datos
const connectDB = async () => {
  try {

    const { connection } = await mongoose.connect('mongodb://admin:qweasdzxc@mongodb:27017/motorock?authSource=admin');
    if (connection.readyState === 1) {
      console.log('MongoDB connected');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Función para crear un nuevo usuario
const createUser = async () => {
  const passwordHash = await bcryptjs.hash('123', 12);
  
  try {
    const newUser = new User({
      dni: '74062106',
      apellidos: 'Espinoza Cadillo',
      nombres: 'Christian Gonzalo',
      celular: '987654321',
      dirección: 'Av. Centenario 123',
      password: passwordHash,
      rol: 'admin',
    });

    const savedUser = await newUser.save();
    console.log('Usuario creado:', savedUser);
  } catch (error) {
    console.error('Error creando el usuario:', error);
  }
};

export { connectDB, createUser };
