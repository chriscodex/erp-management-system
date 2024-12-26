import { AlmacenRepository } from '@/backend/almacenes/domain/repositories/almacenRepository';
import { createAlmacenSchema } from '@/backend/almacenes/application/validations/createAlmacenSchema';
import { updateAlmacenSchema } from './validations/updateAlmacenSchema';

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
  async getAllAlmacenesByData(almacenData) {
    try {
      const almacenes = await this.almacenRepository.getAllAlmacenesByData(
        almacenData
      );

      if (almacenes?.length === 0) {
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
  async updateAlmacen(almacenId, almacenData) {
    try {
      console.log('Almacen Data', almacenData);
      // Validar los datos enviados con el schema
      const almacenValidated = updateAlmacenSchema.safeParse(almacenData);

      if (!almacenValidated.success) {
        console.log(
          'Almacen Service: Error de validación de schema de almacén al actualizar'
        );
        return {
          status: 400,
          payload: almacenValidated.error.issues,
        };
      }

      // Validar si una marca con ese nombre y en el mismo segmento ya existe
      if (almacenData.nombre) {
        const almacenFound = await this.almacenRepository.getAlmacenByData(
          almacenData
        );
        if (almacenFound && almacenFound?._id !== almacenId) {
          console.log(
            'Almacen Service: Un almacen con el mismo nombre ya existe'
          );
          return {
            status: 409,
            payload: 'Un almacen con el mismo nombre',
          };
        }
      }

      const almacenUpdated = await this.almacenRepository.updateAlmacen(
        almacenId,
        almacenData
      );

      if (!almacenUpdated) {
        console.log('Almacen Service: El almacén no existe');
        return {
          status: 404,
          payload: 'El almacén no existe',
        };
      }

      console.log('Almacen Service: Almacén actualizado correctamente');
      return {
        status: 200,
        payload: almacenUpdated,
      };
    } catch (error) {
      console.error(
        `Almacen Service: Error interno al actualizar el almacén: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deleteAlmacen(almacenId) {
    try {
      const almacenDeleted = await this.almacenRepository.deleteAlmacen(
        almacenId
      );

      if (!almacenDeleted) {
        console.log(
          'Almacen Service: Almacén no encontrado para ser eliminado'
        );
        return {
          status: 404,
          payload: 'El almacén no existe',
        };
      }

      console.log('Almacen Service: Almacén eliminado correctamente');
      return {
        status: 204,
        payload: almacenDeleted,
      };
    } catch (error) {
      console.error(
        `Almacen Service: Error interno al eliminar el almacén: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
