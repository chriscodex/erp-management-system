import { PreventaRepository } from '@/backend/preventas/domain/repositories/preventaRepository';
import { createPreventaSchema } from '@/backend/preventas/application/validations/createPreventaSchema';
import { generarNumeroAleatorio } from '@/lib/utils';

export class PreventaService {
  constructor() {
    this.preventaRepository = new PreventaRepository();
  }
  async getPreventaByData(preventaData) {
    try {
      const preventaFound = await this.preventaRepository.getPreventaByData(
        preventaData
      );

      if (!preventaFound) {
        console.log('Preventa Service: La preventa no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Preventa Service: La preventa existe');
      return {
        status: 200,
        payload: preventaFound,
      };
    } catch (error) {
      console.error(
        `Preventa Service: Error interno al buscar la preventa: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async createPreventa(preventaData) {
    try {
      // Validar los datos del producto enviado con el schema
      const preventaValidated = createPreventaSchema.safeParse(preventaData);

      if (!preventaValidated.success) {
        console.log(
          `Preventa Service: Error de validación de schema de preventa al crear ${preventaValidated}`
        );
        return {
          status: 400,
          payload: preventaValidated.error.issues,
        };
      }

      const preventaObject = {
        ...preventaData,
        estado: 'pendiente',
        code: generarNumeroAleatorio(13),
      };
      const newPreventa = await this.preventaRepository.createPreventa(
        preventaObject
      );
      console.log('Preventa Service: Preventa creada correctamente');
      return {
        status: 201,
        payload: newPreventa,
      };
    } catch (error) {
      console.log(
        `Preventa Service: Error interno al crear una preventa ${error}`
      );
      return {
        status: 400,
        payload: error,
      };
    }
  }
}
