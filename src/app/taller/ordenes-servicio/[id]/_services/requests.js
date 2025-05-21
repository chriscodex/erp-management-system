import { delay } from '@/lib/utils';

import { deleteOrdenDeServicioClientUrl, finalizarOrdenDeServicioClientUrl } from '@/lib/urls';
import { deleteData, postData } from '@/lib/fetchData';

export async function deleteOrdenDeServicioRequestClient(ordenDeServicioId) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteOrdenDeServicioClientUrl}/${ordenDeServicioId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar la orden de servicio: ' + response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}

export async function finalizarOrdenDeServicioRequestClient(ordenDeServicioId, counterBoleta) {
  /* eslint-disable */

  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${finalizarOrdenDeServicioClientUrl}/${ordenDeServicioId}/finalizar`;

      // Obtener los datos de la persona
      const response = await postData(url, {counterBoleta});
      
      if (response?.status !== 201) {
        reject(
          'No se pudo eliminar la orden de servicio: ' + response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}