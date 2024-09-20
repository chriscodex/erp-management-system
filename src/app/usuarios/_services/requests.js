import { usersUrl } from '@/app/usuarios/_services/urls';
import { getData } from '@/lib/fetchData';

export async function getAllUsers() {
  try {
    return getData(usersUrl);
  } catch (error) {
    console.log(error);
  }
}

// async function getUser(userId) {
//   try {

//   } catch (error) {

//   }
// }
