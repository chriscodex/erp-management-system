import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';
import { ProductService } from '@/backend/products/application/products.service';
import { MotoService } from '@/backend/motos/application/moto.service';
import { PreventaService } from '@/backend/preventas/application/preventa.service';

export async function getAllProductsRequestServer() {
  try {
    await connectDB();
    const productService = new ProductService();

    const response = await productService.getAllProducts();

    if (response?.status !== 200) {
      console.log('Error al obtener todos los productos');
      return { products: [], status: 500 };
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
export async function getAllMotosRequestServer() {
  try {
    await connectDB();
    const motoService = new MotoService();

    const response = await motoService.getAllMotos();

    if (response?.status !== 200) {
      console.log('Error al obtener todas las motos');
      return { motos: [], status: 500 };
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
export async function getAllPreventasRequestServer() {
  try {
    await connectDB();
    const preventaService = new PreventaService();

    const response = await preventaService.getAllPreventas();

    if (response?.status !== 200) {
      console.log('Error al obtener todas las preventas');
      return { preventas: [], status: 500 };
    }
    const preventas = response?.payload;

    return {
      preventas: simplificadorParaClientComponent(preventas),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}
