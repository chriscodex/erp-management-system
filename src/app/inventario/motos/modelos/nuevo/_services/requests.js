import { postData } from '@/lib/fetchData';
import { createModeloClientUrl } from '@/lib/urls';
import { delay } from '@/lib/utils';

export async function createModeloRequestClient(modeloData, setLoading) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso para pruebas en la UI
      await delay();

      const response = await postData(createModeloClientUrl, modeloData);
      if (response?.status !== 201) {
        setLoading(false);
        reject('No se pudo crear el modelo: ' + response.response?.data?.error);
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
