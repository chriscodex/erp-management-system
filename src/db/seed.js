// eslint ignored
import { connectDB } from './mongodb';
import { models } from 'mongoose';
import bcryptjs from 'bcryptjs';

import { User } from '@/models/user';

async function seedUsers() {
  try {
    await connectDB();

    const data = [
      {
        nombres: 'Christian Gonzalo',
        apellidos: 'Espinoza Cadillo',
        dni: '74062106',
        celular: '931140269',
        direccion: 'Jr. 9 de diciembre 686 Carhuaz Carhuaz',
        rol: 'Administrador',
        password: '123',
      },
      {
        nombres: 'Josue Israel',
        apellidos: 'Rubina Villareal',
        dni: '44362644',
        celular: '931140270',
        direccion: 'Av. Las Flores 364 Independencia Huaraz',
        rol: 'Tecnico',
        password: '123',
      },
      {
        nombres: 'Juan Carlos',
        apellidos: 'Perez Lopez',
        dni: '51456232',
        celular: '931140270',
        direccion: 'Av. Los Próceres 123 Breña Lima',
        rol: 'Tecnico',
        password: '123',
      },
      {
        nombres: 'Maria Elena',
        apellidos: 'Gomez Torres',
        dni: '33148475',
        celular: '931140271',
        direccion: 'Calle Las Flores 456 Surco Lima',
        rol: 'Vendedor',
        password: '123',
      },
    ];

    if (User) {
      delete models.User;
    }

    // Eliminar todos los usuarios existentes
    await User.deleteMany({});
    console.log('Usuarios existentes eliminados.');

    // Hashear las contraseñas de los datos de ejemplo
    const hashedData = await Promise.all(
      data.map(async (user) => {
        const hashedPassword = await bcryptjs.hash(user.password, 12);
        return { ...user, password: hashedPassword };
      })
    );

    // Insertar los nuevos datos
    await User.insertMany(hashedData);
    console.log('Base de datos poblada con éxito.');
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
  }
}

export { seedUsers };
