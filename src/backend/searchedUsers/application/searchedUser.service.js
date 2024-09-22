import { SearchedUserRepository } from '@/backend/searchedUsers/domain/repositories/searchedUserRepository';

/* Instancia de la clase */
const searchedUserRepository = new SearchedUserRepository();

export async function getSearchedUser(dni, getDataByDniFromApi) {
  try {
    const searchedUserFound = await searchedUserRepository.getSearchedUser(dni);

    if (searchedUserFound.length > 0) return searchedUserFound;

    const userDataFromExternalApi = await getDataByDniFromApi(dni);

    if (!userDataFromExternalApi) {
      return null;
    }

    return userDataFromExternalApi;
  } catch (error) {
    throw new Error(
      `Error al buscar el usuario en la API externa o en la base de datos: ${error.message}`
    );
  }
}
