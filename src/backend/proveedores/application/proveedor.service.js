import { ProveedorRepository } from '@/backend/proveedores/domain/repositories/proveedorRepository';
import { createProveedorSchema } from '@/backend/proveedores/application/validations/createProveedorSchema';

export class ProveedorService {
  constructor() {
    this.proveedorRepository = new ProveedorRepository();
  }
  async getAllProveedores() {
    try {
      const proveedores = await this.proveedorRepository.getAllProveedores();

      if (proveedores.length === 0) {
        console.log('Proveedor Service: No se encontraron proveedores');
        return {
          status: 200,
          payload: [],
        };
      }

      console.log('Proveedor Service: Proveedores encontrados');
      return {
        status: 200,
        payload: proveedores,
      };
    } catch (error) {
      console.error(
        `Proveedor Service: Error interno al buscar todas los proveedores: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async createProveedor(proveedorData) {
    try {
      const proveedorValidated = createProveedorSchema.safeParse(proveedorData);

      if (!proveedorValidated.success) {
        console.log(
          `Proveedor Service: Error de validación de schema de proveedor al crear ${proveedorValidated}`
        );
        return {
          status: 400,
          payload: proveedorValidated.error.issues,
        };
      }

      // Validar si el proveedor ya existe
      const proveedorFound = await this.proveedorRepository.getProveedorByData(
        proveedorData
      );
      if (proveedorFound) {
        console.log(
          'Proveedor Service: Un proveedor con los mismos datos ya existe'
        );
        return {
          status: 409,
          payload: 'Un proveedor con los mismos datos ya existe',
        };
      }
      console.log('Proveedor Service: No hay duplicados');

      const proveedorObject = {
        ...proveedorData,
        estado: 'activo',
      };
      // Crear el proveedor
      const proveedorCreated = await this.proveedorRepository.createProveedor(
        proveedorObject
      );
      console.log('Proveedor Service: Proveedor creado correctamente');
      return {
        status: 201,
        payload: proveedorCreated,
      };
    } catch (error) {
      console.error(
        `Proveedor Service: Error interno al crear el proveedor: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deleteProveedor(proveedorId) {
    try {
      const proveedorDeleted = await this.proveedorRepository.deleteProveedor(
        proveedorId
      );

      if (!proveedorDeleted) {
        console.log(
          'Proveedor Service: Proveedor no encontrado para ser eliminado'
        );
        return {
          status: 404,
          payload: 'El proveedor no existe',
        };
      }

      console.log('Proveedor Service: Proveedor eliminado correctamente');
      return {
        status: 204,
        payload: proveedorDeleted,
      };
    } catch (error) {
      console.error(
        `Proveedor Service: Error interno al eliminar el proveedor: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
