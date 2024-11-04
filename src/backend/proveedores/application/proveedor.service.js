import { ProveedorRepository } from '@/backend/proveedores/domain/repositories/proveedorRepository';

export class ProveedorService {
  constructor() {
    this.proveedorRepository = new ProveedorRepository();
  }
  async getAllProveedores() {
    try {
      const proveedores = await this.proveedorRepository.getAllProveedores();

      if (!proveedores) {
        console.log('Proveedor Service: No se encontraron proveedores');
        return {
          status: 404,
          payload: 'No se encontraron proveedores',
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
}
