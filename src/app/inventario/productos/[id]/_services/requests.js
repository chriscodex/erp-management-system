import { connectDB } from '@/db/mongodb';
import { ProductService } from '@/backend/products/application/products.service';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';
import { patchData } from '@/lib/fetchData';
import {
  addUnitProductClientUrl,
  reduceUnitProductClientUrl,
  updateUnitProductClientUrl,
} from '@/lib/urls';

export async function getProductByIdRequestServer(id) {
  try {
    await connectDB();
    const productService = new ProductService();

    const response = await productService.getProductByData({ id });

    if (response?.status !== 200) {
      console.log('Error al obtener el producto desde el cliente');
      return { product: null, status: 500 };
    }
    const product = response?.payload;
    return { product: simplificadorParaClientComponent(product), status: 200 };
  } catch (error) {
    console.log(error);
  }
}

export async function updateUnitProductRequestClient(
  unitProductId,
  unitProductData,
  setLoading
) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const updateUnitProductoUrl = `${updateUnitProductClientUrl}/${unitProductId}`;

      // Obtener los datos de la persona
      const response = await patchData(updateUnitProductoUrl, unitProductData);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar la marca: ' + response.response?.data?.error
        );
        return;
      }

      setLoading(false);
      resolve(response?.response?.data?.payload);
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}

export async function addUnitProductRequestClient(
  productId,
  cantidadAAgregar,
  setLoading
) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const addUnitProductUrl = `${addUnitProductClientUrl}/${productId}`;

      // Obtener los datos de la persona
      const response = await patchData(addUnitProductUrl, {
        cantidadAAgregar,
        type: 'add',
      });
      if (response?.status !== 201) {
        setLoading(false);
        reject(
          'No se pudo agregar nuevas unidades al stock: ' +
            response.response?.data?.error
        );
        return;
      }

      setLoading(false);
      resolve(response?.response?.data?.payload);
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}

export async function reduceUnitProductRequestClient(
  productId,
  cantidadADisminuir,
  setLoading
) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const reduceUnitProductUrl = `${reduceUnitProductClientUrl}/${productId}`;

      // Obtener los datos de la persona
      const response = await patchData(reduceUnitProductUrl, {
        type: 'reduce',
        cantidadADisminuir,
      });
      if (response?.status !== 201) {
        setLoading(false);
        reject(
          'No se pudo disminuir las unidades al stock: ' +
            response.response?.data?.error
        );
        return;
      }

      setLoading(false);
      resolve(response?.response?.data?.payload);
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}
