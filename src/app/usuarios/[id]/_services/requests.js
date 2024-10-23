import { fetchData, patchData } from '@/lib/fetchData';
import { getUserUrl, updateUserUrl } from '@/lib/urls.js';

export async function getUserRequest(dni) {
  try {
    const url = `${getUserUrl}/${dni}`;
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

/* eslint-disable */
export async function updateUserRequest(user, setLoading) {
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      console.log(user);
      // Simular tiempo de retraso
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const { dni } = user;
      const url = `${updateUserUrl}/${dni}`;

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
/* eslint-enable */
