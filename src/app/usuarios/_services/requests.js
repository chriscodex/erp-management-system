import { getAllUsersUrl, deleteUserUrl } from '@/lib/urls.js';
import { fetchData, deleteData } from '@/lib/fetchData';

export async function getAllUsers() {
  try {
    const response = await fetchData(getAllUsersUrl);
    if (response?.status !== 200) {
      console.log('Error al obtener los usuarios');
      return { users: [], status: 500 };
    }
    console.log(response);
    const users = response?.data?.payload;
    return { users, status: 200 };
  } catch (error) {
    console.log(error);
  }
}

/* eslint-disable */
export async function deleteUser(dni) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(dni);
      // Simular tiempo de retraso
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const url = `${deleteUserUrl}/${dni}`;

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
/* eslint-enable */
