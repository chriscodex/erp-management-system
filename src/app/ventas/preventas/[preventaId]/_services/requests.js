import { delay } from '@/lib/utils';

import { deletePreventaClientUrl } from '@/lib/urls';
import { deleteData } from '@/lib/fetchData';

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
