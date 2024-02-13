import { connectDB } from '@/db/mongodb';
import { ProductService } from '@/backend/products/application/products.service';

export async function getAllProductsRequest() {
  try {
    await connectDB();
    const productService = new ProductService();

    const response = await productService.getAllProducts();

    if (response?.status !== 200) {
      console.log('Error al obtener todos los productos');
      return { products: [], status: 500 };
    }
    const products = response?.payload;
    return { products, status: 200 };
  } catch (error) {
    console.error(error);
  }
}
