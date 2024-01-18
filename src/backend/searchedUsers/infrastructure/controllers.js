import { getDataByDniFromExternalApi } from '@/backend/shared/externalApi';
import { SearchedUserService } from '@/backend/searchedUsers/application/searchedUser.service';
import { connectDB } from '@/db/mongodb';

// Crear la instancia del servicio
const searchedUserService = new SearchedUserService(
  getDataByDniFromExternalApi
);

export async function getUserDataByDniController(request) {
  try {
    // Extrae los query parameters de la URL
    const { searchParams } = new URL(request.url);
    const numeroDni = searchParams.get('numero');

    await connectDB();

    const userData = await getDataByDniFromExternalApi(numeroDni);
    return userData;
  } catch (error) {
    console.error(
      'ExternalApi Controller: Error interno al obtener los datos de la persona desde la API externa APIS.NET:',
      error.message
    );
    throw new Error(
      'ExternalApi Controller: Error interno al obtener los datos de la persona desde la API externa APIS.NET'
    );
  }
}

export async function getSearchedUserController(dni) {
  try {
    await connectDB();
    /* Responses { payload, status} */
    const searchedUserData = await searchedUserService.getSearchedUser(
      dni,
      getDataByDniFromExternalApi
    );
    return searchedUserData;
  } catch (error) {
    console.error('Error fetching user data:', error);

    throw new Error('Internal Server Error - getSearchedUserController');
  }
}
