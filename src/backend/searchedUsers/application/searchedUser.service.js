import { SearchedUserRepository } from '@/backend/searchedUsers/domain/repositories/searchedUserRepository';

/* Instancia de la clase */
const searchedUserRepository = new SearchedUserRepository();

export async function getSearchedUser(dni, getDataByDniFromApi) {
  try {
    const searchedUserFound =
      await searchedUserRepository.getSearchedUserFromDatabase(dni);

    if (searchedUserFound) {
      return {
        payload: searchedUserFound,
        status: 200,
      };
    }

    const userDataFromExternalApi = await getDataByDniFromApi(dni);

    return userDataFromExternalApi;
  } catch (error) {
    throw new Error(
      `Error al buscar el usuario en la API externa o en la base de datos: ${error.message}`
    );
  }
}
