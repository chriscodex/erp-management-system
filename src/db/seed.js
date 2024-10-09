import { connectDB } from '@/db/mongodb';
import { models } from 'mongoose';
import bcryptjs from 'bcryptjs';

import {
  userMockData,
  searchedUsersDataMock,
  segmentDataMock,
  categoryDataMock,
} from '@/db/mock-data';
import { User } from '@/backend/users/domain/models/user';
import { SearchedUser } from '@/backend/searchedUsers/domain/models/searchedUser';
import { Segment } from '@/backend/categorias/domain/models/segment';
import { Category } from '@/backend/categorias/domain/models/category';

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

export async function seedCategories() {
  try {
    if (Segment) {
      delete models.Segment;
    }

    // Eliminar todas las categorías existentes
    await Category.deleteMany({});
    console.log('Categorías existentes eliminadas.');

    // Obtener todos los segmentos
    const segmentos = await Segment.find({});
    if (segmentos.length === 0) {
      throw new Error(
        'No se encontraron segmentos en la base de datos. Asegúrate de ejecutar el seed de segmentos primero.'
      );
    }

    // Crear un mapa de segmentos para acceder por nombre
    const segmentMap = {};
    segmentos.forEach((segmento) => {
      segmentMap[segmento.nombre] = segmento._id; // Usa el nombre del segmento como clave
    });

    // Llenar los segmentId en categoryDataMock
    categoryDataMock.forEach((category) => {
      if (segmentMap['Motos']) {
        category.segmentId = segmentMap['Motos'];
      }
      if (segmentMap['Productos']) {
        if (category.nombre === 'Aceites' || category.nombre === 'Cascos') {
          category.segmentId = segmentMap['Productos'];
        }
      }
    });

    // Insertar los datos generados de categorías
    await Category.insertMany(categoryDataMock);
    console.log('Categorías pobladas en la base de datos.');
  } catch (error) {}
}

export async function seed() {
  try {
    await connectDB();

    await seedUsers();
    await seedSearchedUsers();
    await seedSegment();
    await seedCategories();
  } catch (error) {
    console.error('Error al ejecutar el seeding:', error);
  }
}
