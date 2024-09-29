import { createUserUrl } from '@/app/usuarios/_services/urls';
import { postData } from '@/lib/fetchData';

/* eslint-disable */
export async function createUser(user, setLoading) {
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Obtener los datos de la persona
      const response = await postData(createUserUrl, user);
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
/* eslint-enable */
