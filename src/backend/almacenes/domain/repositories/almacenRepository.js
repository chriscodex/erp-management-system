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
        return [];
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
  async getAlmacenByData(almacenData) {
    try {
      if (!almacenData) {
        console.log('Almacén Repository: Almacen no proporcionada');
        return null;
      }

      const filter = {};

      if (almacenData.id) {
        filter._id = new mongoose.Types.ObjectId(almacenData.id);
      }

      if (almacenData.nombre) {
        filter.nombre = { $regex: new RegExp(`^${almacenData.nombre}$`, 'i') };
      }

      if (almacenData.estado) {
        filter.estado = { $regex: new RegExp(`^${almacenData.estado}$`, 'i') };
      }

      const almacenFound = await this.almacenModel.findOne(filter);

      if (!almacenFound) {
        console.log('Almacén Repository: Almacén no encontrado');
        return null;
      }

      console.log('Almacén Repository: Almacén encontrado');
      return almacenFound;
    } catch (error) {
      console.error(
        `Almacén Repository: Error al buscar el almacen: ${error.message}`
      );
      throw new Error(`Error al buscar el almacen: ${error.message}`);
    }
  }
  async createAlmacen(almacenData) {
    try {
      const newAlmacen = new this.almacenModel(almacenData);
      const almacenSaved = await newAlmacen.save();

      console.log('Almacen Repository: Almacen creado correctamente');
      return almacenSaved;
    } catch (error) {
      console.log(
        `Almacen Repository: Error al crear el almacen: ${error.message}`
      );
      throw new Error(`Error al crear el almacen: ${error.message}`);
    }
  }
}
