import { deleteData } from '@/lib/fetchData';
import { deleteMotoClientUrl } from '@/lib/urls';
import { delay } from '@/lib/utils';

export async function deleteMotoRequestClient(motoId) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteMotoClientUrl}/${motoId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar la moto: ' + response.response?.data?.error,
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}
