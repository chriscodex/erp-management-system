import { getAllUsersUrl } from './apiUrls';
import { getData } from '@/utils/fetchData';

async function getAllUsers() {
  try {
    return getData(getAllUsersUrl);
  } catch (error) {
    console.log(error);
  }
}

// async function getUser(userId) {
//   try {

//   } catch (error) {

//   }
// }

export { getAllUsers };
