import { ClienteRepository } from '@/backend/clientes/domain/repository/clienteRepository';
import { createClienteSchema } from '@/backend/clientes/application/validations/createClienteSchema';
import { updateClienteSchema } from '@/backend/clientes/application/validations/updateClienteSchema';


export class ClienteService {
  constructor() {
    this.clienteRepository = new ClienteRepository();
  }
  async getAllClientes() {
    try {
      const clientes = await this.clienteRepository.getAllClientes();

      if (clientes?.length === 0) {
        console.log('Cliente Service: No se encontraron clientes');
        return {
          status: 200,
          payload: [],
        };
      }

      console.log('Cliente Service: Clientes encontradas');
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

      console.log(clienteData);

      const clienteFound = await this.clienteRepository.getClienteByData(clienteData);

      if (!clienteFound) {
        console.log('Cliente Service: El cliente no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Cliente Service: El cliente existe');
      return {
        status: 200,
        payload: clienteFound,
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
          'Cliente Service: Error de validación de schema de cliente al crear'
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
      const clienteCreated = await this.clienteRepository.createCliente(clienteObject);

      const clienteCreatedObject = clienteCreated.toObject();

      console.log('Cliente Service: Cliente creado correctamente');
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
          'Cliente Service: Error de validación de schema de cliente al actualizar'
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
        console.log('Cliente Service: El cliente no existe');
        return {
          status: 200,
          payload: clienteUpdated,
        };
      }

      console.log('Cliente Service: Cliente actualizada correctamente');
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
      const clienteDeleted = await this.clienteRepository.deleteCliente(clienteId);

      if (!clienteDeleted) {
        console.log('Cliente Service: El cliente no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Cliente Service: Cliente eliminado correctamente');
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
