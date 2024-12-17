import { deleteData, patchData, postData } from '@/lib/fetchData';
import {
  createGastoClientUrl,
  deleteGastoClientUrl,
  updateGastoClientUrl,
} from '@/lib/urls';
import { delay } from '@/lib/utils';

export async function addGastoRequestClient(productId, gastoData, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const url = `${createGastoClientUrl}/${productId}/gastos`;

      const gastoTest = {
        ...gastoData,
      };

      // Obtener los datos de la persona
      const response = await postData(url, gastoTest);
      if (response?.status !== 201) {
        setLoading(false);
        reject('No se pudo crear el gasto: ' + response.response?.data?.error);
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

export async function deleteGastoRequestClient(gastoId, productId) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      console.log(gastoId, productId);
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteGastoClientUrl}/${productId}/gastos/${gastoId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar el gasto: ' + response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}

export async function updateGastoRequestClient(
  gastoId,
  productId,
  productData,
  setLoading
) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const updateCategoryUrl = `${updateGastoClientUrl}/${productId}/gastos/${gastoId}`;

      // Obtener los datos de la persona
      const response = await patchData(updateCategoryUrl, productData);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar el gasto: ' + response.response?.data?.error
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
