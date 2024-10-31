import { ProductService } from '@/backend/products/application/products.service';
import { connectDB } from '@/db/mongodb';

const productService = new ProductService();

export async function getAllProductsController() {
  try {
    await connectDB();
    const products = await productService.getAllProducts();
    return products;
  } catch (error) {
    console.error('Controller: Error obteniendo todas los productos:', error);
    throw new Error(
      'Controller: Internal Server Error - getAllProductsController'
    );
  }
}
