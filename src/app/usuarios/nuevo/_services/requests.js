import { createUserClientUrl } from '@/lib/urls.js';
import { postData } from '@/lib/fetchData';
import { delay } from '@/lib/utils';

export async function createUserRequestClient(user, setLoading) {
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      // Obtener los datos de la persona
      const response = await postData(createUserClientUrl, user);
      if (response?.status !== 201) {
        setLoading(false);
        reject(
          'No se pudo crear el usuario: ' + response.response?.data?.error
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
