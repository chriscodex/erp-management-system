import { ProductService } from '@/backend/products/application/products.service';
import { connectDB } from '@/db/mongodb';

const productService = new ProductService();

export async function getProductsController() {
  try {
    await connectDB();
    const products = await productService.getAllProducts();
    return products;
  } catch (error) {
    console.error(
      'Product Controller: Error interno al obtener todas los productos:',
      error.message
    );
    throw new Error(
      'Product Controller: Error interno al obtener todas los productos'
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

export async function createProductController(request) {
  try {
    const body = await request.json();

    await connectDB();

    const createdProduct = await productService.createProduct(body);
    return createdProduct;
  } catch (error) {
    console.error(
      'Product Controller: Error interno al crear el producto:',
      error.message
    );
    throw new Error('Product Controller: Error interno al crear el producto');
  }
}
