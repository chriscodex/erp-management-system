import { AlmacenRepository } from '@/backend/almacenes/domain/repositories/almacenRepository';
import { createAlmacenSchema } from '@/backend/almacenes/application/validations/createAlmacenSchema';

export class AlmacenService {
  constructor() {
    this.almacenRepository = new AlmacenRepository();
  }
  async getAllAlmacenes() {
    try {
      const almacenes = await this.almacenRepository.getAllAlmacenes();

      if (almacenes.length === 0) {
        console.log('Almacen Service: No se encontraron almacenes');
        return {
          status: 200,
          payload: [],
        };
      }

      console.log('Almacen Service: almacenes encontrados');
      return {
        status: 200,
        payload: almacenes,
      };
    } catch (error) {
      console.error(
        `Almacen Service: Error interno al buscar todas los almacenes: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getAlmacenByData(almacenData) {
    try {
      const almacenFound = await this.almacenRepository.getAlmacenByData(
        almacenData
      );

      if (!almacenFound) {
        console.log('Almacen Service: La almacen no existe');
        return {
          status: 404,
          payload: 'La almacen no existe',
        };
      }

      console.log('Almacen Service: La almacen existe');
      return {
        status: 200,
        payload: almacenFound,
      };
    } catch (error) {
      console.error(
        `Almacen Service: Error interno al buscar el almacen: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async createAlmacen(almacenData) {
    try {
      const almacenValidated = createAlmacenSchema.safeParse(almacenData);

      if (!almacenValidated.success) {
        console.log(
          `Almacen Service: Error de validación de schema de almacen al crear ${almacenValidated}`
        );
        return {
          status: 400,
          payload: almacenValidated.error.issues,
        };
      }

      // Validar si un almacen con ese nombre y en el mismo segmento ya existe
      const almacenFound = await this.almacenRepository.getAlmacenByData(
        almacenData
      );
      if (almacenFound) {
        console.log(
          'Almacen Service: Un almacen con el mismo nombre ya existe'
        );
        return {
          status: 409,
          payload: 'Un almacen con el mismo nombre ya existe',
        };
      }
      console.log('Almacen Service: No hay duplicados');

      const almacenObject = {
        ...almacenData,
        estado: 'activo',
      };

      const almacenCreated = await this.almacenRepository.createAlmacen(
        almacenObject
      );
      console.log('Almacen Service: Almacen creado correctamente');
      return {
        status: 201,
        payload: almacenCreated,
      };
    } catch (error) {
      console.error(
        `Almacen Service: Error interno al crear un almacen: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
