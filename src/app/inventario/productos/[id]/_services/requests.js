import { connectDB } from '@/db/mongodb';
import { ProductService } from '@/backend/products/application/products.service';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';
import { deleteData, patchData } from '@/lib/fetchData';
import {
  addUnitProductClientUrl,
  deleteUnitFromProductClientUrl,
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
  setLoading,
) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const updateUnitProductoUrl = `${updateUnitProductClientUrl}/1/unit-product/${unitProductId}`;

      // Obtener los datos de la persona
      const response = await patchData(updateUnitProductoUrl, unitProductData);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar la unidad de producto: ' +
            response.response?.data?.error,
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
  setLoading,
) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
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
            response.response?.data?.error,
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
  setLoading,
) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
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
            response.response?.data?.error,
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

export async function deleteUnitProductRequestClient(productId, unitProductId) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteUnitFromProductClientUrl}/${productId}/unit-product/${unitProductId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar el producto: ' + response.response?.data?.error,
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}
