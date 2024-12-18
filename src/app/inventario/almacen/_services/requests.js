import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';

import { AlmacenService } from '@/backend/almacenes/application/almacen.service';
import { MotoService } from '@/backend/motos/application/moto.service';
import { ProductService } from '@/backend/products/application/products.service';

export async function getAllAlmacenesRequestServer() {
  try {
    await connectDB();
    const almacenService = new AlmacenService();

    const response = await almacenService.getAllAlmacenes();
    if (response?.status !== 200) {
      console.log('Error al obtener todos los almacenes');
      return { almacenes: [], status: response?.status };
    }

    const almacenes = response?.payload;
    return {
      almacenes: simplificadorParaClientComponent(almacenes),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllMotosByAlmacenIdRequestServer(almacenId) {
  try {
    await connectDB();
    const motoService = new MotoService();

    const response = await motoService.getAllMotosByData({ almacenId });

    if (response?.status !== 200) {
      console.log('Error al obtener las motos por modelo desde el cliente');
      return { motos: [], status: 500 };
    }
    const motosByModeloId = response?.payload;
    return {
      motos: simplificadorParaClientComponent(motosByModeloId),
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProductsByAlmacenIdRequestServer(almacenId) {
  try {
    await connectDB();
    const productService = new ProductService();

    const response = await productService.getAllProductsByData({ almacenId });

    if (response?.status !== 200) {
      console.log('Error al obtener las motos por modelo desde el cliente');
      return { products: [], status: 500 };
    }
    const productos = response?.payload;
    return {
      products: simplificadorParaClientComponent(productos),
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}
