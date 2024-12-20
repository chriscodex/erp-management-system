import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';

import { MotoService } from '@/backend/motos/application/moto.service';
import { ProductService } from '@/backend/products/application/products.service';

export async function getAllProductsForHomeRequestServer() {
  try {
    await connectDB();
    const productService = new ProductService();

    const response = await productService.getAllProducts();
    if (response?.status !== 200) {
      console.log('Error al obtener todos los productos');
      return { products: null, status: response?.status };
    }
    const products = response?.payload;
    return {
      products: simplificadorParaClientComponent(products),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllMotosForHomeRequestServer() {
  try {
    await connectDB();
    const motoService = new MotoService();

    const response = await motoService.getAllMotos();
    if (response?.status !== 200) {
      console.log('Error al obtener todos las motos');
      return { motos: [], status: response?.status };
    }
    const motos = response?.payload;
    return {
      motos: simplificadorParaClientComponent(motos),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}
