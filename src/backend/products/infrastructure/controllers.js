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

export async function getProductByDataController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;

    await connectDB();

    const product = await productService.getProductByData({ id });
    return product;
  } catch (error) {
    console.error(
      'Product Controller: Error interno buscando el producto:',
      error.message
    );
    throw new Error('Product Controller: Error interno buscando el producto');
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

export async function updateUnitProductController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;
    const body = await request.json();

    await connectDB();

    const result = await productService.updateUnitProduct(id, body);
    return result;
  } catch (error) {
    console.error(
      'Product Controller: Error interno actualizando el unitProduct:',
      error.message
    );
    throw new Error(
      'Product Controller: Error interno actualizando el unitProduct'
    );
  }
}

export async function createGastoController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { id: productId } = params;
    const body = await request.json();

    await connectDB();

    const createdCategory = await productService.createGasto(body, productId);
    return createdCategory;
  } catch (error) {
    console.error(
      'Product Controller: Error interno al crear un gasto:',
      error.message
    );
    throw new Error('Product Controller: Error interno al crear un gasto');
  }
}

export async function deleteGastoController(contextRoute) {
  try {
    console.log(contextRoute);
    const { params } = contextRoute;
    const { id: productId, gastoId } = params;

    await connectDB();

    const deletedGasto = await productService.deleteGasto(
      gastoId,
      productId
    );
    return deletedGasto;
  } catch (error) {
    console.error(
      'Product Controller: Error interno al eliminar un gasto:',
      error.message
    );
    throw new Error('Product Controller: Error interno al eliminar un gasto');
  }
}
