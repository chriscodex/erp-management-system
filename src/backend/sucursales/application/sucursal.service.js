import { SucursalRepository } from '@/backend/sucursales/domain/repositories/sucursalRepository';
import { createSucursalSchema } from '@/backend/sucursales/application/validations/createSucursalSchema';
import { updateSucursalSchema } from '@/backend/sucursales/application/validations/updateSucursalSchema';

export class SucursalService {
  constructor() {
    this.sucursalRepository = new SucursalRepository();
  }
  async getAllSucursales() {
    try {
      const sucursales = await this.sucursalRepository.getAllSucursales();

      if (sucursales?.length === 0) {
        console.log('Sucursal Service: No se encontraron sucursales');
        return {
          status: 200,
          payload: [],
        };
      }

      console.log('Sucursal Service: Sucursales encontradas');
      return {
        status: 200,
        payload: sucursales,
      };
    } catch (error) {
      console.error(
        `Sucursal Service: Error interno al buscar todas las sucursales: ${error.message}`,
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getSucursalByData(sucursalData) {
    try {
      const sucursalFound =
        await this.sucursalRepository.getSucursalByData(sucursalData);

      if (!sucursalFound) {
        console.log('Sucursal Service: La sucursal no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Sucursal Service: La sucursal existe');
      return {
        status: 200,
        payload: sucursalFound,
      };
    } catch (error) {
      console.error(
        `Sucursal Service: Error interno al buscar una sucursal: ${error.message}`,
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async createSucursal(sucursal) {
    try {
      const sucursalValidated = createSucursalSchema.safeParse(sucursal);

      if (!sucursalValidated.success) {
        console.log(
          'Sucursal Service: Error de validación de schema de sucursal al crear',
        );
        return {
          status: 400,
          payload: sucursalValidated.error.issues,
        };
      }

      // Validar si la sucursal existe
      const sucursalFound =
        await this.sucursalRepository.getSucursalByData(sucursal);
      if (sucursalFound) {
        console.log('Sucursal Service: La sucursal ya existe');
        return {
          status: 409,
          payload: 'La sucursal ya existe',
        };
      }

      // Crear el objeto de sucursal
      const sucursalObject = {
        ...sucursal,
      };

      // Crear la sucursal
      const sucursalCreated =
        await this.sucursalRepository.createSucursal(sucursalObject);

      const sucursalCreatedObject = sucursalCreated.toObject();

      console.log('Sucursal Service: Sucursal creada correctamente');
      return {
        status: 201,
        payload: sucursalCreatedObject,
      };
    } catch (error) {
      console.error(
        `Sucursal Service: Error interno al crear una sucursal: ${error.message}`,
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async updateSucursal(sucursalId, sucursalData) {
    try {
      // Validar los datos de la sucursal enviada con el schema
      const sucursalValidated = updateSucursalSchema.safeParse(sucursalData);

      if (!sucursalValidated.success) {
        console.log(
          'Sucursal Service: Error de validación de schema de sucursal al actualizar',
        );
        return {
          status: 400,
          payload: sucursalValidated.error.issues,
        };
      }

      const sucursalUpdated = await this.sucursalRepository.updateSucursal(
        sucursalId,
        sucursalData,
      );

      if (!sucursalUpdated) {
        console.log('Sucursal Service: La sucursal no existe');
        return {
          status: 200,
          payload: sucursalUpdated,
        };
      }

      console.log('Sucursal Service: Sucursal actualizada correctamente');
      return {
        status: 200,
        payload: sucursalUpdated,
      };
    } catch (error) {
      console.error(
        `Sucursal Service: Error interno al actualizar una sucursal: ${error.message}`,
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deleteSucursal(sucursalId) {
    try {
      const sucursalDeleted =
        await this.sucursalRepository.deleteSucursal(sucursalId);

      if (!sucursalDeleted) {
        console.log('Sucursal Service: La sucursal no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Sucursal Service: Sucursal eliminada correctamente');
      return {
        status: 204,
        payload: sucursalDeleted,
      };
    } catch (error) {
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
