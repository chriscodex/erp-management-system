import { SearchedUserRepository } from '@/backend/searchedUsers/domain/repositories/searchedUserRepository';
import { MayusculasATitulo } from '@/lib/formateador';

export class SearchedUserService {
  constructor(getDataByDniFromExternalApi) {
    this.searchedUserRepository = new SearchedUserRepository();
    this.getDataByDniFromExternalApi = getDataByDniFromExternalApi;
  }

  async getSearchedUser(dni) {
    try {
      const searchedUserFound =
        await this.searchedUserRepository.getSearchedUserFromDatabase(dni);

      if (searchedUserFound) {
        const searchedUserFoundFormated = {
          dni: searchedUserFound.dni,
          apellidos: searchedUserFound.apellidos,
          nombres: searchedUserFound.nombres,
        };

        return {
          payload: searchedUserFoundFormated,
          status: 200,
        };
      }

      const userFromExternalApi = await this.getDataByDniFromExternalApi(dni);

      if (userFromExternalApi.status !== 200) {
        return {
          payload: userFromExternalApi.payload,
          status: userFromExternalApi.status,
        };
      }

      const searchedUserCreated = await this.searchedUserRepository.createSearchedUser(
        dni,
        MayusculasATitulo(
          `${userFromExternalApi.payload.apellidoPaterno} ${userFromExternalApi.payload.apellidoMaterno}`
        ),
        MayusculasATitulo(userFromExternalApi.payload.nombres)
      );

      const searchedUserCreatedFormated = {
        dni: searchedUserCreated.dni,
        apellidos: searchedUserCreated.apellidos,
        nombres: searchedUserCreated.nombres,
      };

      return {
        payload: searchedUserCreatedFormated,
        status: 200,
      };
    } catch (error) {
      throw new Error(`Error al buscar el usuario: ${error.message}`);
    }
  }
}
