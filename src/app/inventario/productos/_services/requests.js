import { connectDB } from '@/db/mongodb';
import { ProductService } from '@/backend/products/application/products.service';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';
import { deleteProductClientUrl } from '@/lib/urls';
import { deleteData } from '@/lib/fetchData';

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

export async function deleteProductRequestClient(productId) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteProductClientUrl}/${productId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar el producto: ' + response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}