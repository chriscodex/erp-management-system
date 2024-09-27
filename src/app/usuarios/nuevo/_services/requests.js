import { createUserUrl } from '@/app/usuarios/nuevo/_services/urls';
import { postData } from '@/lib/fetchData';

export async function createUser(user) {
  try {
    const response = await postData(createUserUrl, user);
    return response;
  } catch (error) {
    console.log(error);
  }
}