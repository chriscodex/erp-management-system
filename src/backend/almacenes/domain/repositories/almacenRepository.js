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
  async getAllAlmacenesByData(almacenData) {
    try {
      if (!almacenData) {
        console.log('Almacén Repository: Datos del almacén no proporcionados');
        return null;
      }

      const filter = {};

      if (almacenData.estado) {
        filter.estado = { $regex: new RegExp(`^${almacenData.estado}$`, 'i') };
      }

      const almacenesFound = await this.almacenModel.find(filter);

      if (almacenesFound.length === 0) {
        console.log('Almacén Repository: Almaces no encontrados');
        return null;
      }

      console.log('Almacén Repository: Almaces encontrados');
      return almacenesFound;
    } catch (error) {
      console.error(
        `Almacén Repository: Error al buscar los almacenes: ${error.message}`
      );
      throw new Error(`Error al buscar los almacenes: ${error.message}`);
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
  async updateAlmacen(almacenId, almacenData) {
    try {
      const updatedAlmacen = await this.almacenModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(almacenId) },
        almacenData,
        {
          new: true,
        }
      );

      if (!updatedAlmacen) {
        console.log(
          'Almacen Repository: Almacen no encontrado para ser actualizada'
        );
        return null;
      }

      console.log('Almacen Repository: Almacen actualizado correctamente');
      return updatedAlmacen;
    } catch (error) {
      console.error(
        `Almacen Repository: Error al actualizar el almacen: ${error.message}`
      );
      throw new Error(`Error al actualizar el almacen: ${error.message}`);
    }
  }
  async deleteAlmacen(almacenId) {
    try {
      const deletedAlmacen = await this.almacenModel.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(almacenId),
      });

      if (!deletedAlmacen) {
        console.log(
          'Almacen Repository: Almacén no encontrado para ser eliminado'
        );
        return null;
      }

      console.log('Almacen Repository: Almacén encontrado y eliminado');
      return deletedAlmacen;
    } catch (error) {
      console.error(
        `Almacen Repository: Error al eliminar el almacén: ${error.message}`
      );
      throw new Error(`Error al eliminar el almacén: ${error.message}`);
    }
  }
}
