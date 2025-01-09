import { putData } from '@/lib/fetchData';
import { updatePreventaClientUrl } from '@/lib/urls';
import { delay } from '@/lib/utils';

export async function updatePreventaRequestClient(preventaData, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const updatePreventaUrl = `${updatePreventaClientUrl}/${preventaData?._id}`;

      // Obtener los datos de la persona
      const response = await putData(updatePreventaUrl, preventaData);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar la preventa: ' + response.response?.data?.error
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
