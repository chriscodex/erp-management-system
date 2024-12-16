import { postData } from '@/lib/fetchData';
import { createMotoClientUrl } from '@/lib/urls';
import { delay } from '@/lib/utils';

export async function createUnidadMotoRequestClient(motoData, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso para pruebas en la UI
      await delay();

      const response = await postData(createMotoClientUrl, motoData);
      if (response?.status !== 201) {
        setLoading(false);
        reject('No se pudo crear la moto: ' + response.response?.data?.error);
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
