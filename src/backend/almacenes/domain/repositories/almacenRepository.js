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
  async getAlmacenById(id) {
    try {
      const almacen = await this.almacenModel
        .findOne({
          _id: new mongoose.Types.ObjectId(id),
        })

      if (!almacen) {
        console.log('Almacén Repository: Almacén no encontrado');
        return null;
      }

      console.log('Almacén Repository: Almacén encontrado');
      return almacen;
    } catch (error) {
      console.error(
        `Almacén Repository: Error al buscar el almacen: ${error.message}`
      );
      throw new Error(`Error al buscar el almacen: ${error.message}`);
    }
  }
}
