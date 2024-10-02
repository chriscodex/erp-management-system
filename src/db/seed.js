import { connectDB } from '@/db/mongodb';
import { models } from 'mongoose';
import bcryptjs from 'bcryptjs';

import { userMockData } from '@/db/mock-data';
import { User } from '@/backend/users/domain/models/user';
import { SearchedUser } from '@/backend/searchedUsers/domain/models/searchedUser';

export async function seedUsers() {
  try {
    if (User) {
      delete models.User;
    }

    // Eliminar todos los usuarios existentes
    await User.deleteMany({});
    console.log('Usuarios existentes eliminados.');

    // Hashear las contraseñas de los datos de ejemplo
    /* eslint-disable */
    const hashedData = await Promise.all(
      userMockData.map(async (user) => {
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
