import { ProductService } from '@/backend/products/application/products.service';
import { connectDB } from '@/db/mongodb';

const productService = new ProductService();

export async function getProductsController(request) {
  try {
    // Extrae los query parameters de la URL
    const { searchParams } = new URL(request.url);
    const productUnitCode = searchParams.get('unit-code');
    const obsequioCode = searchParams.get('obsequio-code');

    await connectDB();

    if (obsequioCode !== null) {
      const product = await productService.getProductByData({
        unitCode: obsequioCode,
        obsequio: 'si',
      });
      return product;
    }

    if (productUnitCode !== null) {
      const product = await productService.getProductByData({
        unitCode: productUnitCode,
        unitEstado: { $in: ['disponible', 'reparado', 'dañado', 'desaparecido'] },
      });
      return product;
    }

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
    const { unitId } = params;
    const body = await request.json();

    await connectDB();

    const result = await productService.updateUnitProduct(unitId, body);
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

export async function updateOrAddOrReduceUnitsToProductController(
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
    if (body.type === 'update') {
      delete body.type;
      const updatedProduct = await productService.updateProduct(id, body);
      return updatedProduct;
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

export async function deleteSingleUnitFromProductController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { id: productId, unitId } = params;

    console.log(params);

    await connectDB();

    const deletedProduct = await productService.deleteSingleUnitFromProduct(
      productId,
      unitId
    );

    return deletedProduct;
  } catch (error) {
    console.error(
      'Product Controller: Error interno al eliminar una unidad del producto:',
      error.message
    );
    throw new Error(
      'Product Controller: Error interno al eliminar una unidad del producto'
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
