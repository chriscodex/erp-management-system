import { getAllUsersUrl } from '@/app/usuarios/_services/urls';
import { fetchData } from '@/lib/fetchData';

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
