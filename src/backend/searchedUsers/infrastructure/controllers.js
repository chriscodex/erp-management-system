import { getDataByDniFromApi } from '@/backend/shared/externalApi';
import { getSearchedUser } from '@/backend/searchedUsers/application/searchedUser.service';

export async function getUserDataByDniController(dni) {
  try {
    const userData = await getDataByDniFromApi(dni);
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Internal Server Error - getUserDataByDniController');
  }
}

export async function getSearchedUserController(dni) {
  try {
    /* Responses { payload, status} */
    const searchedUserData = await getSearchedUser(dni, getDataByDniFromApi);

    return searchedUserData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Internal Server Error - getSearchedUserController');
  }
}
