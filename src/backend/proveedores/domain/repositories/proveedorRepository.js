import mongoose from 'mongoose';

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
  async getProveedorByData(proveedorData) {
    try {
      if (!proveedorData) {
        console.log('Proveedor Repository: Proveedor no proporcionado');
        return null;
      }

      const filter = {};

      if (proveedorData.id) {
        filter._id = new mongoose.Types.ObjectId(proveedorData.id);
      }

      if (proveedorData.nombre) {
        filter.nombre = {
          $regex: new RegExp(`^${proveedorData.nombre}$`, 'i'),
        };
      }

      if (proveedorData.ruc) {
        filter.estado = { $regex: new RegExp(`^${proveedorData.ruc}$`, 'i') };
      }

      const proveedorFound = await this.proveedorModel.findOne(filter);

      if (!proveedorFound) {
        console.log('Proveedor Repository: Proveedor no encontrado');
        return null;
      }

      console.log('Proveedor Repository: Proveedor encontrado');
      return proveedorFound;
    } catch (error) {
      console.error(
        `Proveedor Repository: Error al buscar al proveedor: ${error.message}`
      );
      throw new Error(`Error al buscar al proveedor: ${error.message}`);
    }
  }
}
