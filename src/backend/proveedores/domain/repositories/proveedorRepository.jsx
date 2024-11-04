import { Proveedor } from '@/backend/proveedores/domain/models/proveedor';

export class ProveedorRepository {
  constructor() {
    this.proveedorModel = Proveedor;
  }
  async getAllProveedores() {
    try {
      const proveedores = await this.proveedorModel.find();

      if (proveedores.length === 0) {
        console.log('Proveedor Repository: No se encontraron proveedores');
        return null;
      }

      console.log('Proveedor Repository: Proveedores encontrados');
      return proveedores;
    } catch (error) {
      console.error(
        `Proveedor Repository: Error al buscar todos los proveedores: ${error.message}`
      );
      throw new Error(
        `Error al buscar todos los proveedores: ${error.message}`
      );
    }
  }
}
