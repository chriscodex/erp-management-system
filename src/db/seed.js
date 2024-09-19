import { connectDB } from './mongodb';
import { models } from 'mongoose';
import bcryptjs from 'bcryptjs';

import { User } from '@/users/domain/models/user';
import { SearchedUser } from '@/users/domain/models/searchedUser';

export async function seedUsers() {
  try {
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
    /* eslint-disable */
    const hashedData = await Promise.all(
      data.map(async (user) => {
        const hashedPassword = await bcryptjs.hash(user.password, 12);
        return { ...user, password: hashedPassword };
      })
    );
    /* eslint-enable */

    // Insertar los nuevos datos
    await User.insertMany(hashedData);
    console.log('Usuarios poblados a la base de datos');
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
  }
}

export async function seedSearchedUsers() {
  try {
    const data = [
      {
        dni: '74062106',
        apellidos: 'Espinoza Cadillo',
        nombres: 'Christian Gonzalo',
      },
    ];

    if (SearchedUser) {
      delete models.SearchedUser;
    }

    // Eliminar todos los usuarios existentes
    await SearchedUser.deleteMany({});
    console.log('SearchedUsers existentes eliminados.');

    // Insertar los nuevos datos
    await SearchedUser.insertMany(data);
    console.log('SearchedUsers poblados a la base de datos');
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
  }
}

export async function seed() {
  try {
    await connectDB(); // Conectarse a la base de datos solo una vez
    await seedUsers();
    await seedSearchedUsers();
  } catch (error) {
    console.error('Error al ejecutar el seeding:', error);
  }
}
