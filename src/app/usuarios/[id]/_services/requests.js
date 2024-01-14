import { fetchData, patchData } from '@/lib/fetchData';
import { getUserServerUrl, updateUserClientUrl } from '@/lib/urls.js';
import { delay } from '@/lib/utils';

export async function getUserRequest(dni) {
  try {
    const url = `${getUserServerUrl}/${dni}`;
    const response = await fetchData(url);
    if (response?.status !== 200) {
      console.log('Error al obtener el usuario desde el cliente');
      return { user: null, status: 500 };
    }
    const user = response?.data?.payload;
    return { user, status: 200 };
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserRequest(user, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const { dni } = user;
      const url = `${updateUserClientUrl}/${dni}`;

      // Obtener los datos de la persona
      const response = await patchData(url, user);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar el usuario: ' + response.response?.data?.error
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
