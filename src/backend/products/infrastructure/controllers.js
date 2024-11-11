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

export async function getProductByIdController(id) {
  try {
    await connectDB();
    const productData = await productService.getProductById(id);
    return productData;
  } catch (error) {
    console.error('Controller: Error buscando el producto:', error);
    throw new Error(
      'Controller: Internal Server Error - getProductByIdController'
    );
  }
}

export async function createProductController(product) {
  try {
    await connectDB();
    const createdProduct = await productService.createProduct(product);
    return createdProduct;
  } catch (error) {
    console.error('Controller: Error creando el producto:', error);
    throw new Error(
      'Controller: Internal Server Error - createProductController'
    );
  }
}
