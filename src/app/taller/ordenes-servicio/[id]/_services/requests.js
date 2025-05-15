import { delay } from '@/lib/utils';

import { deleteOrdenDeServicioClientUrl } from '@/lib/urls';
import { deleteData} from '@/lib/fetchData';

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