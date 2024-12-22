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

export async function addOrReduceUnitsToProductController(
  request,
  contextRoute
) {
  try {
    const { params } = contextRoute;
    const { id } = params;
    const body = await request.json();

    await connectDB();
    if (body.type === 'add') {
      const result = await productService.addUnitsToProduct(id, body);
      return result;
    }
    if (body.type === 'reduce') {
      const result = await productService.removeUnitsToProduct(id, body);
      return result;
    }
  } catch (error) {
    console.error(
      'Product Controller: Error interno agregando unidades al producto:',
      error.message
    );
    throw new Error(
      'Product Controller: Error interno agregando unidades al producto'
    );
  }
}

export async function deleteProductController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;

    await connectDB();

    const deletedProduct = await productService.deleteProduct(id);

    return deletedProduct;
  } catch (error) {
    console.error(
      'Product Controller: Error interno al eliminar un producto:',
      error.message
    );
    throw new Error(
      'Product Controller: Error interno al eliminar un producto'
    );
  }
}

export async function createGastoController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { id: productId } = params;
    const body = await request.json();

    await connectDB();

    const gastoCreated = await productService.createGasto(body, productId);
    return gastoCreated;
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
    const { params } = contextRoute;
    const { id: productId, gastoId } = params;

    await connectDB();

    const deletedGasto = await productService.deleteGasto(gastoId, productId);
    return deletedGasto;
  } catch (error) {
    console.error(
      'Product Controller: Error interno al eliminar un gasto:',
      error.message
    );
    throw new Error('Product Controller: Error interno al eliminar un gasto');
  }
}

export async function updateGastoController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { id: productId, gastoId } = params;
    const body = await request.json();

    await connectDB();

    const result = await productService.updateGasto(gastoId, productId, body);
    return result;
  } catch (error) {
    console.error(
      'Product Controller: Error interno actualizando el gasto:',
      error.message
    );
    throw new Error('Product Controller: Error interno actualizando el gasto');
  }
}
