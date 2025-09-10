import { patchData } from '@/lib/fetchData';
import { updateReservacionClientUrl } from '@/lib/urls';
import { delay } from '@/lib/utils';

export async function updateReservacionRequestClient(
  reservacionData,
  setLoading,
) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const updateReservacionUrl = `${updateReservacionClientUrl}/${reservacionData?._id}`;

      const response = await patchData(updateReservacionUrl, reservacionData);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar la reservacion: ' +
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
