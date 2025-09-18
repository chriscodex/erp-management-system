import { GastoGeneralRepository } from '@/backend/gastosGenerales/domain/repositories/gastoGeneralRepository';

import { createGastoGeneralSchema } from '@/backend/gastosGenerales/application/validations/createGastoGeneralSchema';
import { updateGastoGeneralSchema } from '@/backend/gastosGenerales/application/validations/updateGastoGeneralSchema';

export class GastoGeneralService {
  constructor() {
    this.gastoGeneralRepository = new GastoGeneralRepository();
  }
  async getAllGastosGenerales() {
    try {
      const gastosGenerales =
        await this.gastoGeneralRepository.getAllGastosGenerales();

      if (gastosGenerales?.length === 0) {
        console.log(
          'Gasto General Service: No se encontraron gastos generales',
        );
        return {
          status: 200,
          payload: [],
        };
      }

      console.log('Gasto General Service: Gastos generales encontradas');
      return {
        status: 200,
        payload: gastosGenerales,
      };
    } catch (error) {
      console.error(
        `Gasto General Service: Error interno al buscar todos los gastos generales: ${error.message}`,
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getGastoGeneralByData(gastoGeneralData) {
    try {
      console.log(gastoGeneralData);

      const gastoGeneralFound =
        await this.gastoGeneralRepository.getGastoGeneralByData(
          gastoGeneralData,
        );

      if (!gastoGeneralFound) {
        console.log('Gasto General Service: El gasto general no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Gasto General Service: El gasto general existe');
      return {
        status: 200,
        payload: gastoGeneralFound,
      };
    } catch (error) {
      console.error(
        `Gasto General Service: Error interno al buscar un gasto general: ${error.message}`,
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async createGastoGeneral(gastoGeneral) {
    try {
      const gastoGeneralValidated =
        createGastoGeneralSchema.safeParse(gastoGeneral);

      if (!gastoGeneralValidated.success) {
        console.log(
          'Gasto General Service: Error de validación de schema de gasto general al crear',
        );
        return {
          status: 400,
          payload: gastoGeneralValidated.error.issues,
        };
      }
      // Crear el objeto de gasto general
      const gastoGeneralObject = {
        ...gastoGeneral,
      };

      // Crear la gasto general
      const gastoGeneralCreated =
        await this.gastoGeneralRepository.createGastoGeneral(
          gastoGeneralObject,
        );

      const gastoGeneralCreatedObject = gastoGeneralCreated.toObject();

      console.log('Gasto General Service: Gasto general creado correctamente');
      return {
        status: 201,
        payload: gastoGeneralCreatedObject,
      };
    } catch (error) {
      console.error(
        `Gasto General Service: Error interno al crear un gasto general: ${error.message}`,
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async updateGastoGeneral(gastoGeneralId, gastoGeneralData) {
    try {
      // Validar los datos del gasto general enviada con el schema
      const gastoGeneralValidated =
        updateGastoGeneralSchema.safeParse(gastoGeneralData);

      if (!gastoGeneralValidated.success) {
        console.log(
          'Gasto General Service: Error de validación de schema de gasto general al actualizar',
        );
        return {
          status: 400,
          payload: gastoGeneralValidated.error.issues,
        };
      }

      const gastoGeneralUpdated =
        await this.gastoGeneralRepository.updateGastoGeneral(
          gastoGeneralId,
          gastoGeneralData,
        );

      if (!gastoGeneralUpdated) {
        console.log('Gasto General Service: Gasto general no existe');
        return {
          status: 200,
          payload: gastoGeneralUpdated,
        };
      }

      console.log(
        'Gasto General Service: Gasto general actualizado correctamente',
      );
      return {
        status: 200,
        payload: gastoGeneralUpdated,
      };
    } catch (error) {
      console.error(
        `Gasto General Service: Error interno al actualizar un gasto general: ${error.message}`,
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deleteGastoGeneral(gastoGeneralId) {
    try {
      const gastoGeneralDeleted =
        await this.gastoGeneralRepository.deleteGastoGeneral(gastoGeneralId);

      if (!gastoGeneralDeleted) {
        console.log('Gasto General Service: El gasto general no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log(
        'Gasto General Service: Gasto general eliminado correctamente',
      );
      return {
        status: 204,
        payload: gastoGeneralDeleted,
      };
    } catch (error) {
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
