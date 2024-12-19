import { generarCodigoUnicoDeMoto } from '@/backend/motos/application/helpers';
import { createMotoSchema } from '@/backend/motos/application/validations/createMotoSchema';

import { MotoRepository } from '@/backend/motos/domain/repositories/motoRepository';
import { ModeloRepository } from '@/backend/modelos/domain/repositories/modeloRepository';
import { AlmacenRepository } from '@/backend/almacenes/domain/repositories/almacenRepository';
import { ProveedorRepository } from '@/backend/proveedores/domain/repositories/proveedorRepository';
import { GastoMotoRepository } from '@/backend/motos/domain/repositories/gastoMotoRepository';

export class MotoService {
  constructor() {
    this.motoRepository = new MotoRepository();
    this.modeloRepository = new ModeloRepository();
    this.almacenRepository = new AlmacenRepository();
    this.proveedorRepository = new ProveedorRepository();
    this.gastoMotoRepository = new GastoMotoRepository();
  }
  async getAllMotos() {
    try {
      const motos = await this.motoRepository.getAllMotos();

      if (motos.length === 0) {
        console.log('Moto Service: No se encontraron motos');
        return {
          status: 200,
          payload: 'No se encontraron motos',
        };
      }

      console.log('Moto Service: Motos encontradas');
      return {
        status: 200,
        payload: motos,
      };
    } catch (error) {
      console.error(
        `Moto Service: Error interno al obtener las motos: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getAllMotosByData(motoData) {
    try {
      const motosFiltered = await this.motoRepository.getAllMotosByData(
        motoData
      );

      if (!motosFiltered) {
        console.log(
          'Moto Service: No se encontraron motos filtradas por modeloId'
        );
        return {
          status: 200,
          payload: 'No se encontraron motos filtradas por modeloId',
        };
      }

      console.log('Moto Service: Motos filtradas por modeloId encontradas');
      return {
        status: 200,
        payload: motosFiltered,
      };
    } catch (error) {
      console.error(
        `Moto Service: Error interno al obtener las motos filtradas por modeloId: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async countAllMotos() {
    try {
      const totalMotos = await this.motoRepository.countAllMotos();

      console.log('Moto Service: Motos contadas');
      return {
        status: 200,
        payload: totalMotos,
      };
    } catch (error) {
      console.error(
        `Moto Service: Error interno al contar todas las motos: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getMotoByData(motoData) {
    try {
      const motoFound = await this.motoRepository.getMotoByData(motoData);

      if (!motoFound) {
        console.log('Moto Service: La moto no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Moto Service: La moto existe');
      return {
        status: 200,
        payload: motoFound,
      };
    } catch (error) {
      console.error(
        `Moto Service: Error interno al buscar la moto: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async createMoto(motoData) {
    try {
      const motoValidated = createMotoSchema.safeParse(motoData);

      if (!motoValidated.success) {
        console.log(
          `Moto Service: Error de validación de schema de moto al crear ${motoValidated}`
        );
        return {
          status: 400,
          payload: motoValidated.error.issues,
        };
      }

      // Validar si una moto con ese nombre y en el mismo modelo ya existe
      const motoFound = await this.motoRepository.getMotoByData(motoData);
      if (motoFound) {
        console.log('Moto Service: Una moto con el mismo nombre ya existe');
        return {
          status: 409,
          payload: 'Una Moto con el mismo nombre ya existe',
        };
      }
      console.log('Moto Service: No hay duplicados');

      // Validar si el modelo existe
      const modeloFound = await this.modeloRepository.getModeloByData({
        id: motoData.modeloId,
      });
      const { code: modeloCode } = modeloFound;
      if (!modeloFound) {
        console.log('Moto Service: El modelo no existe');
        return {
          status: 404,
          payload: 'El modelo no existe',
        };
      }
      console.log('Moto Service: La moto existe');

      // Validar si el almacen existe
      const almacenFound = await this.almacenRepository.getAlmacenByData({
        id: motoData.almacenId,
      });
      if (!almacenFound) {
        console.log('Moto Service: El almacen no existe');
        return {
          status: 404,
          payload: 'El almacen no existe',
        };
      }
      console.log('Moto Service: El almacen existe');

      // Validar si el proveedor existe
      const proveedorFound = await this.proveedorRepository.getProveedorByData({
        id: motoData.proveedorId,
      });
      if (!proveedorFound) {
        console.log('Moto Service: El proveedor no existe');
        return {
          status: 404,
          payload: 'El proveedor no existe',
        };
      }
      console.log('Moto Service: El proveedor existe');

      const motoCode = await generarCodigoUnicoDeMoto(
        modeloCode,
        this.motoRepository
      );

      const motoObject = {
        ...motoData,
        code: motoCode,
        estado: 'disponible',
      };

      const motoCreated = await this.motoRepository.createMoto(motoObject);
      console.log('Moto Service: Moto creada correctamente');
      return {
        status: 201,
        payload: motoCreated,
      };
    } catch (error) {
      console.error(
        `Moto Service: Error interno al crear la moto: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deleteMoto(motoId) {
    try {
      const motoDeleted = await this.motoRepository.deleteMoto(motoId);

      if (!motoDeleted) {
        console.log('Moto Service: Moto no encontrado para ser eliminado');
        return {
          status: 404,
          payload: 'La moto no existe',
        };
      }

      console.log('Moto Service: Moto eliminado correctamente');
      return {
        status: 204,
        payload: motoDeleted,
      };
    } catch (error) {
      console.error(
        `Moto Service: Error interno al eliminar una moto: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async createGastoMoto(gastoData, moto) {
    try {
      const gastoCreated = await this.gastoMotoRepository.createGastoMoto(
        gastoData,
        moto
      );

      if (!gastoCreated) {
        console.log('Moto Service: Moto no encontrada para agregar gasto');
        return {
          status: 404,
          payload: 'Moto no encontrada para agregar gasto',
        };
      }

      console.log('Moto Service: Gasto agregado correctamente');
      return {
        status: 201,
        payload: gastoCreated,
      };
    } catch (error) {
      console.error(
        `Moto Service: Error interno al agregar un gasto a la moto: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deleteGastoMoto(gastoId, motoId) {
    try {
      const gastoDeleted = await this.gastoMotoRepository.deleteGastoMoto(
        gastoId,
        motoId
      );

      if (!gastoDeleted) {
        console.log('Moto Service: Moto no encontrada para eliminar el gasto');
        return {
          status: 404,
          payload: 'Moto no encontrada para eliminar el gasto',
        };
      }

      console.log('Moto Service: Gasto eliminado correctamente');
      return {
        status: 204,
        payload: gastoDeleted,
      };
    } catch (error) {
      console.error(
        `Moto Service: Error interno al eliminar un gasto a la moto: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async updateGastoMoto(gastoId, motoId, gastoData) {
    try {
      if (!gastoId) {
        console.log('Moto Service: El id del gasto es requerido');
        return {
          status: 400,
          payload: 'El id del gasto es requerido',
        };
      }

      if (!motoId) {
        console.log('Moto Service: El id de la moto es requerido');
        return {
          status: 400,
          payload: 'El id de la moto es requerido',
        };
      }

      const gastoWithId = {
        _id: gastoId,
        ...gastoData,
      };

      const gastoUpdated = await this.gastoMotoRepository.updateGastoMoto(
        gastoId,
        motoId,
        gastoWithId
      );

      if (!gastoUpdated) {
        console.log('Moto Service: Moto no encontrada para ser actualizada');
        return {
          status: 404,
          payload: 'Moto no encontrada para ser actualizado',
        };
      }

      console.log('Moto Service: Gasto actualizado correctamente');
      return {
        status: 200,
        payload: gastoUpdated,
      };
    } catch (error) {
      console.error(
        `Moto Service: Error interno al actualizar el gasto: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
