import { delay } from '@/lib/utils';

import { deleteReservacionClientUrl } from '@/lib/urls';
import { deleteData } from '@/lib/fetchData';

export async function deleteReservacionRequestClient(reservacionId) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteReservacionClientUrl}/${reservacionId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar la reservacion: ' +
            response.response?.data?.error,
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}
