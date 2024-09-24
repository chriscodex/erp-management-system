import { getDataByDniFromApi } from '@/backend/shared/externalApi';
import { SearchedUserService } from '@/backend/searchedUsers/application/searchedUser.service';
import { connectDB } from '@/db/mongodb';

// Crear la instancia del servicio
const searchedUserService = new SearchedUserService(getDataByDniFromApi);

export async function getUserDataByDniController(dni) {
  try {
    await connectDB();
    const userData = await getDataByDniFromApi(dni);
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Internal Server Error - getUserDataByDniController');
  }
}

export async function getSearchedUserController(dni) {
  try {
    await connectDB();
    /* Responses { payload, status} */
    const searchedUserData = await searchedUserService.getSearchedUser(
      dni,
      getDataByDniFromApi
    );
    return searchedUserData;
  } catch (error) {
    console.error('Error fetching user data:', error);

    throw new Error('Internal Server Error - getSearchedUserController');
  }
}
