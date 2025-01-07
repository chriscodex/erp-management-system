import { delay } from '@/lib/utils';

import { createVentaClientUrl, deletePreventaClientUrl } from '@/lib/urls';
import { deleteData, postData } from '@/lib/fetchData';

export async function deletePreventaRequestClient(preventaId) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deletePreventaClientUrl}/${preventaId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar la preventa: ' + response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}

export async function createVentaRequestClient(preventaId) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const response = await postData(createVentaClientUrl, { id: preventaId });
      if (response?.status !== 201) {
        reject('No se pudo crear la venta: ' + response.response?.data?.error);
        return;
      }

      resolve(response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}
