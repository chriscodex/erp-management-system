import { getAllUsersServerUrl, deleteUserClientUrl } from '@/lib/urls.js';
import { fetchData, deleteData } from '@/lib/fetchData';
import { delay } from '@/lib/utils';

export async function getAllUsersRequest() {
  try {
    const response = await fetchData(getAllUsersServerUrl);
    if (response?.status !== 200) {
      console.log('Error al obtener todos los usuarios');
      return { users: [], status: 500 };
    }
    const users = response?.data?.payload;
    return { users, status: 200 };
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUserRequest(dni) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteUserClientUrl}/${dni}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar el usuario: ' + response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}
