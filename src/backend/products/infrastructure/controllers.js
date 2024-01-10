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

export async function getProductByDataController(productData) {
  try {
    await connectDB();
    const product = await productService.getProductByData(productData);
    return product;
  } catch (error) {
    console.error('Controller: Error buscando el producto:', error);
    throw new Error(
      'Controller: Internal Server Error - getProductByDataController'
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
