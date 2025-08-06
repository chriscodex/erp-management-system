import { ClienteRepository } from "@/backend/clientes/domain/repositories/clienteRepository";
import { createClienteSchema } from "@/backend/clientes/application/validations/createClienteSchema";
import { updateClienteSchema } from "@/backend/clientes/application/validations/updateClienteSchema";
import { SearchedUserRepository } from "@/backend/searchedUsers/domain/repositories/searchedUserRepository";
import { MayusculasATitulo } from '@/lib/formateador';

export class ClienteService {

  constructor(getDataByDniFromExternalApi, getDataByRucFromExternalApi) {
    this.clienteRepository = new ClienteRepository();
    this.searchedUserRepository = new SearchedUserRepository();
    this.getDataByDniFromExternalApi = getDataByDniFromExternalApi;
    this.getDataByRucFromExternalApi = getDataByRucFromExternalApi;
  }
  async getAllClientes() {
    try {
      const clientes = await this.clienteRepository.getAllClientes();

      if (clientes?.length === 0) {
        console.log("Cliente Service: No se encontraron clientes");
        return {
          status: 200,
          payload: [],
        };
      }

      console.log("Cliente Service: Clientes encontrados");
      return {
        status: 200,
        payload: clientes,
      };
    } catch (error) {
      console.error(
        `Cliente Service: Error interno al buscar todas las clientes: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getClienteByData(clienteData) {
    try {
      const clienteFound = await this.clienteRepository.getClienteByData(
        clienteData
      );

      if (clienteFound) {
        console.log("Cliente Service: El cliente existe");
        return {
          status: 200,
          payload: clienteFound,
        };
      }

      console.log("Cliente Service: Cliente no encontrado en la base de datos");

      const identificador =
        clienteData.dni || clienteData.ruc || clienteData._id;

      if (!identificador) {
        return {
          status: 400,
          payload: "Debe proporcionar un DNI, RUC o ID",
        };
      }

      console.log(identificador);

      // Si es búsqueda por DNI
      if (identificador.length === 8) {
        const searchedUserFound =
          await this.searchedUserRepository.getSearchedUserFromDatabaseByDni(
            identificador
          );

        if (searchedUserFound) {
          return {
            status: 200,
            payload: {
              dni: searchedUserFound.dni,
              apellidos: searchedUserFound.apellidos,
              nombres: searchedUserFound.nombres,
            },
          };
        }

        const userFromExternalApi = await this.getDataByDniFromExternalApi(
          identificador
        );

        if (userFromExternalApi.status !== 200) {
          return {
            status: userFromExternalApi.status,
            payload: userFromExternalApi.payload,
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

        return {
          status: 200,
          payload: {
            dni: searchedUserCreated.dni,
            apellidos: searchedUserCreated.apellidos,
            nombres: searchedUserCreated.nombres,
          },
        };
      }

      // Si es búsqueda por RUC
      if (identificador.length === 11) {
        const searchedUserFound =
          await this.searchedUserRepository.getSearchedUserFromDatabaseByRuc(
            identificador
          );

        if (searchedUserFound) {
          return {
            status: 200,
            payload: {
              ruc: searchedUserFound.ruc,
              razonSocial: searchedUserFound.razonSocial,
            },
          };
        }

        const userFromExternalApi = await this.getDataByRucFromExternalApi(
          identificador
        );

        if (userFromExternalApi.status !== 200) {
          return {
            status: userFromExternalApi.status,
            payload: userFromExternalApi.payload,
          };
        }

        const searchedUserCreated =
          await this.searchedUserRepository.createSearchedUserByRuc(
            identificador,
            userFromExternalApi?.payload?.razonSocial
          );

        return {
          status: 200,
          payload: {
            ruc: searchedUserCreated.ruc,
            razonSocial: searchedUserCreated.razonSocial,
          },
        };
      }
      // Si no es un dni ni ruc válido
      return {
        status: 400,
        payload: "Identificador inválido",
      };
    } catch (error) {
      console.error(
        `Cliente Service: Error interno al buscar el cliente: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }

  async createCliente(cliente) {
    try {
      const clienteValidated = createClienteSchema.safeParse(cliente);

      if (!clienteValidated.success) {
        console.log(
          "Cliente Service: Error de validación de schema de cliente al crear"
        );
        return {
          status: 400,
          payload: clienteValidated.error.issues,
        };
      }
      // Crear el objeto de cliente
      const clienteObject = {
        ...cliente,
      };

      // Crear la cliente
      const clienteCreated = await this.clienteRepository.createCliente(
        clienteObject
      );

      const clienteCreatedObject = clienteCreated.toObject();

      console.log("Cliente Service: Cliente creado correctamente");
      return {
        status: 201,
        payload: clienteCreatedObject,
      };
    } catch (error) {
      console.error(
        `Cliente Service: Error interno al crear un cliente: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }

  async updateCliente(clienteId, clienteData) {
    try {
      // Validar los datos de la cliente enviados con el schema
      const clienteValidated = updateClienteSchema.safeParse(clienteData);

      if (!clienteValidated.success) {
        console.log(
          "Cliente Service: Error de validación de schema de cliente al actualizar"
        );
        return {
          status: 400,
          payload: clienteValidated.error.issues,
        };
      }

      const clienteUpdated = await this.clienteRepository.updateCliente(
        clienteId,
        clienteData
      );

      if (!clienteUpdated) {
        console.log("Cliente Service: El cliente no existe");
        return {
          status: 200,
          payload: clienteUpdated,
        };
      }

      console.log("Cliente Service: Cliente actualizada correctamente");
      return {
        status: 200,
        payload: clienteUpdated,
      };
    } catch (error) {
      console.error(
        `Cliente Service: Error interno al actualizar un cliente: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deleteCliente(clienteId) {
    try {
      const clienteDeleted = await this.clienteRepository.deleteCliente(
        clienteId
      );

      if (!clienteDeleted) {
        console.log("Cliente Service: El cliente no existe");
        return {
          status: 200,
          payload: null,
        };
      }

      console.log("Cliente Service: Cliente eliminado correctamente");
      return {
        status: 204,
        payload: clienteDeleted,
      };
    } catch (error) {
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
