import mongoose from 'mongoose';
import { Almacen } from '@/backend/almacenes/domain/models/almacen';

export class AlmacenRepository {
  constructor() {
    this.almacenModel = Almacen;
  }
  async getAllAlmacenes() {
    try {
      const almacenes = await this.almacenModel.find();

      if (almacenes.length === 0) {
        console.log('Almacén Repository: No se encontraron almacenes');
        return null;
      }

      console.log('Almacén Repository: Almacenes encontrados');
      return almacenes;
    } catch (error) {
      console.error(
        `Almacén Repository: Error al buscar todas los almacenes: ${error.message}`
      );
      throw new Error(
        `Almacén Repository: Error al buscar todas los almacenes: ${error.message}`
      );
    }
  }
}
