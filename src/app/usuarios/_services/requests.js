import { getAllUsersUrl } from '@/app/usuarios/_services/urls';
import { fetchData } from '@/lib/fetchData';

export async function getAllUsers() {
  try {
    const users = await fetchData(getAllUsersUrl);
    return users;
  } catch (error) {
    console.log(error);
  }
}
