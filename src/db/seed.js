import { connectDB } from '@/db/mongodb';
import { models } from 'mongoose';
import bcryptjs from 'bcryptjs';

import {
  userMockData,
  searchedUsersDataMock,
  segmentDataMock,
  categoryDataMock,
  marcaDataMock,
  empresaDataMock,
  almacenDataMock,
  proveedorDataMock,
  productsDataMock,
} from '@/db/mock-data';
import { User } from '@/backend/users/domain/models/user';
import { SearchedUser } from '@/backend/searchedUsers/domain/models/searchedUser';
import { Segment } from '@/backend/segments/domain/models/segment';
import { Category } from '@/backend/categorias/domain/models/category';
import { Marca } from '@/backend/marcas/domain/models/marca';
import { Empresa } from '@/backend/empresas/domain/models/empresa';
import { Almacen } from '@/backend/almacenes/domain/models/almacen';
import { Proveedor } from '@/backend/proveedores/domain/models/proveedor';
import { Product } from '@/backend/products/domain/models/product';

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
    if (Category) {
      delete models.Category;
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
  } catch (error) {
    console.error('Seed: Error al poblar la base de datos:', error);
  }
}

export async function seedMarcas() {
  try {
    if (Marca) {
      delete models.Marca;
    }

    // Eliminar todas las marcas existentes
    await Marca.deleteMany({});
    console.log('Marcas existentes eliminadas.');

    // Obtener todos las categorias
    const segments = await Segment.find({});
    if (segments.length === 0) {
      throw new Error(
        'No se encontraron categorías en la base de datos. Asegúrate de ejecutar el seed de segmentos primero.'
      );
    }

    // Crear un mapa de segmentos para acceder por nombre
    const segmentMap = {};
    segments.forEach((segmento) => {
      segmentMap[segmento.nombre] = segmento._id; // Usa el nombre del segmento como clave
    });

    // Llenar los segmentId en categoryDataMock
    marcaDataMock.forEach((marca) => {
      if (segmentMap['Productos']) {
        if (
          marca.nombre === 'Castrol' ||
          marca.nombre === 'Motul' ||
          marca.nombre === 'NGK' ||
          marca.nombre === 'K&N' ||
          marca.nombre === 'Liqui Moly'
        ) {
          marca.segmentId = segmentMap['Productos'];
        }
      }
      if (segmentMap['Motos']) {
        if (
          marca.nombre === 'Honda' ||
          marca.nombre === 'Harley-Davidson' ||
          marca.nombre === 'Yamaha' ||
          marca.nombre === 'Kawasaki' ||
          marca.nombre === 'Ducati' ||
          marca.nombre === 'BMW Motorrad'
        ) {
          marca.segmentId = segmentMap['Motos'];
        }
      }
    });

    // Insertar los datos generados de categorías
    await Marca.insertMany(marcaDataMock);
    console.log('Marcas pobladas en la base de datos.');
  } catch (error) {
    console.error('Seed: Error al poblar la base de datos:', error);
  }
}

export async function seedEmpresa() {
  try {
    if (Empresa) {
      delete models.Empresa;
    }

    // Eliminar todos las empresas existentes
    await Empresa.deleteMany({});
    console.log('Empresas existentes eliminados.');

    // Insertar las nuevas empresas
    await Empresa.insertMany(empresaDataMock);
    console.log('Empresas pobladas en la base de datos');
  } catch (error) {
    console.error('Error al poblar las empresas en la base de datos:', error);
  }
}

export async function seedAlmacen() {
  try {
    if (Almacen) {
      delete models.Almacen;
    }

    // Eliminar todos los almacenes existentes
    await Almacen.deleteMany({});
    console.log('Almacenes existentes eliminados.');

    // Insertar los nuevos datos
    await Almacen.insertMany(almacenDataMock);
    console.log('Almacenes poblados a la base de datos');
  } catch (error) {
    console.error('Error al poblar los almacenes en base de datos:', error);
  }
}

export async function seedProveedor() {
  try {
    if (Proveedor) {
      delete models.Proveedor;
    }

    // Eliminar todos los proveedores existentes
    await Proveedor.deleteMany({});
    console.log('Proveedores existentes eliminados.');

    // Insertar los nuevos datos
    await Proveedor.insertMany(proveedorDataMock);
    console.log('Proveedores poblados a la base de datos');
  } catch (error) {
    console.error(
      'Error al poblar los proveedores en la base de datos:',
      error
    );
  }
}

export async function seedProducts() {
  try {
    if (Product) {
      delete models.Product;
    }        
    // Eliminar todos los productos existentes
    await Product.deleteMany({});
    console.log('Productos existentes eliminados.');

    // Obtener todos los segmentos, marcas, categorías, almacenes y proveedores
    const [segments, marcas, categorias, almacenes, proveedores] =
      await Promise.all([
        Segment.find({}),
        Marca.find({}),
        Category.find({}),
        Almacen.find({}),
        Proveedor.find({}),
      ]);

    if (segments.length === 0)
      throw new Error('No se encontraron segmentos en la base de datos.');
    if (marcas.length === 0)
      throw new Error('No se encontraron marcas en la base de datos.');
    if (categorias.length === 0)
      throw new Error('No se encontraron categorías en la base de datos.');
    if (almacenes.length === 0)
      throw new Error('No se encontraron almacenes en la base de datos.');
    if (proveedores.length === 0)
      throw new Error('No se encontraron proveedores en la base de datos.');

    // Crear mapas para acceder a los datos por nombre
    const segmentMap = segments.reduce(
      (map, segment) => ({ ...map, [segment.nombre]: segment._id }),
      {}
    );
    const marcaMap = marcas.reduce(
      (map, marca) => ({ ...map, [marca.nombre]: marca._id }),
      {}
    );
    const categoriaMap = categorias.reduce(
      (map, categoria) => ({ ...map, [categoria.nombre]: categoria._id }),
      {}
    );
    const almacenMap = almacenes.reduce(
      (map, almacen) => ({ ...map, [almacen.nombre]: almacen._id }),
      {}
    );
    const proveedorMap = proveedores.reduce(
      (map, proveedor) => ({ ...map, [proveedor.nombre]: proveedor._id }),
      {}
    );

    // Rellenar los campos vacíos en el mock
    productsDataMock.forEach((product) => {
      product.segmentId = segmentMap['Productos'] || '';
      product.marcaId = marcaMap['Castrol'] || '';
      product.categoryId = categoriaMap['Aceites'] || '';
      product.almacenId = almacenMap['MotoRock Ruta 33'] || '';
      product.proveedorId = proveedorMap['Motorland SAS'] || '';
    });

    // Insertar los datos de productos
    await Product.insertMany(productsDataMock);
    console.log('Productos poblados en la base de datos.');
  } catch (error) {
    console.error('Seed: Error al poblar la base de datos:', error);
  }
}

export async function seed() {
  try {
    await connectDB();

    await seedUsers();
    await seedSearchedUsers();
    await seedSegment();
    await seedCategories();
    await seedMarcas();
    await seedEmpresa();
    await seedAlmacen();
    await seedProveedor();
    await seedProducts();
  } catch (error) {
    console.error('Error al ejecutar el seeding:', error);
  }
}
