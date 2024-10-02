import { connectDB } from '@/db/mongodb';
import { models } from 'mongoose';
import bcryptjs from 'bcryptjs';

import {
  userMockData,
  searchedUsersDataMock,
  segmentDataMock,
} from '@/db/mock-data';
import { User } from '@/backend/users/domain/models/user';
import { SearchedUser } from '@/backend/searchedUsers/domain/models/searchedUser';
import { Segment } from '@/backend/categorias/domain/models/segment';

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
    if (SearchedUser) {
      delete models.SearchedUser;
    }

    // Eliminar todos los usuarios existentes
    await SearchedUser.deleteMany({});
    console.log('SearchedUsers existentes eliminados.');

    // Insertar los nuevos datos
    await SearchedUser.insertMany(searchedUsersDataMock);
    console.log('SearchedUsers poblados a la base de datos');
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
  }
}

export async function seedSegment() {
  try {
    if (Segment) {
      delete models.Segment;
    }

    // Eliminar todos los segmentos existentes
    await Segment.deleteMany({});
    console.log('Segmentos existentes eliminados.');

    // Insertar los nuevos datos
    await Segment.insertMany(segmentDataMock);
    console.log('Segmentos poblados a la base de datos');
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
  }
}

export async function seed() {
  try {
    await connectDB();

    await seedUsers();
    await seedSearchedUsers();
    await seedSegment();
  } catch (error) {
    console.error('Error al ejecutar el seeding:', error);
  }
}
