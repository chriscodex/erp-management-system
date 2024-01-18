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

export async function getSearchedUserController(request) {
  try {
    // Extrae los query parameters de la URL
    const { searchParams } = new URL(request.url);
    const dni = searchParams.get('dni');

    await connectDB();

    const searchedUserData = await searchedUserService.getSearchedUser(dni);
    return searchedUserData;
  } catch (error) {
    console.error(
      'SearchedUser Controller: Error interno al obtener los datos del searchedUser:',
      error.message
    );

    throw new Error(
      'SearchedUser Controller: Error interno al obtener los datos del searchedUser'
    );
  }
}
