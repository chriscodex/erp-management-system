import { ClienteRepository } from '@/backend/clientes/domain/repository/clienteRepository';
import { SearchedUserRepository } from '@/backend/searchedUsers/domain/repositories/searchedUserRepository';
import { MayusculasATitulo } from '@/lib/formateador';

export class ClienteService {
  constructor(getDataByDniFromExternalApi, getDataByRucFromExternalApi) {
    this.clienteRepository = new ClienteRepository();
    this.searchedUserRepository = new SearchedUserRepository();
    this.getDataByDniFromExternalApi = getDataByDniFromExternalApi;
    this.getDataByRucFromExternalApi = getDataByRucFromExternalApi;
  }

  async getCliente(identificador) {
    try {
      const clienteFound = await this.clienteRepository.getClienteFromDatabase(
        identificador
      );

      if (clienteFound) {
        return {
          payload: clienteFound,
          status: 200,
        };
      }

      if (identificador.length === 8) {
        const searchedUserFound =
          await this.searchedUserRepository.getSearchedUserFromDatabaseByDni(
            identificador
          );

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

        const userFromExternalApi = await this.getDataByDniFromExternalApi(
          identificador
        );

        if (userFromExternalApi.status !== 200) {
          return {
            payload: userFromExternalApi.payload,
            status: userFromExternalApi.status,
          };
        }

        const searchedUserCreated =
          await this.searchedUserRepository.createSearchedUserByDni(
            identificador,
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
      }
      if (identificador.length === 11) {
        const searchedUserFound =
          await this.searchedUserRepository.getSearchedUserFromDatabaseByRuc(
            identificador
          );

        if (searchedUserFound) {
          const searchedUserFoundFormated = {
            ruc: searchedUserFound.ruc,
            razonSocial: searchedUserFound.razonSocial,
          };

          return {
            payload: searchedUserFoundFormated,
            status: 200,
          };
        }

        const userFromExternalApi = await this.getDataByRucFromExternalApi(
          identificador
        );

        if (userFromExternalApi.status !== 200) {
          return {
            payload: userFromExternalApi.payload,
            status: userFromExternalApi.status,
          };
        }

        const searchedUserCreated =
          await this.searchedUserRepository.createSearchedUserByRuc(
            identificador,
            userFromExternalApi?.payload?.razonSocial
          );

        const searchedUserCreatedFormated = {
          ruc: searchedUserCreated.ruc,
          razonSocial: searchedUserCreated.razonSocial,
        };

        return {
          payload: searchedUserCreatedFormated,
          status: 200,
        };
      }
    } catch (error) {
      console.error('SearchedUser Service: Error al buscar el usuario');
      throw new Error(
        `SearchedUser Service: Error al buscar el usuario: ${error.message}`
      );
    }
  }
}
