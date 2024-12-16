import mongoose from 'mongoose';

import { Moto } from '@/backend/motos/domain/models/moto';

export class MotoRepository {
  constructor() {
    this.motoModel = Moto;
  }
  async getAllMotosByModeloId(modeloId) {
    try {
      const filter = {};

      if (modeloId) {
        filter.modeloId = new mongoose.Types.ObjectId(modeloId);
      }

      const motos = await this.motoModel
        .find(filter)
        .populate('modeloId')
        .populate('almacenId')
        .populate('proveedorId');

      if (motos.length === 0) {
        console.log('Moto Repository: No se encontraron motos con ese modelo');
        return [];
      }

      console.log('Moto Repository: Motos encontradas');
      return motos;
    } catch (error) {
      console.error(
        `Moto Repository: Error al buscar todas las motos de un modelo: ${error.message}`
      );
      throw new Error(
        `Moto Repository: Error al buscar todas las motos de un modelo: ${error.message}`
      );
    }
  }
  async getMotoByData(motoData) {
    try {
      if (!motoData) {
        console.log('Moto Repository: Moto no proporcionado');
        return null;
      }

      const filter = {};

      if (motoData.id) {
        filter._id = new mongoose.Types.ObjectId(motoData.id);
      }

      if (motoData.modeloId) {
        filter.modeloId = new mongoose.Types.ObjectId(motoData.modeloId);
      }

      if (motoData.almacenId) {
        filter.almacenId = new mongoose.Types.ObjectId(motoData.almacenId);
      }

      if (motoData.proveedorId) {
        filter.proveedorId = new mongoose.Types.ObjectId(motoData.proveedorId);
      }

      if (motoData.code) {
        filter.code = { $regex: new RegExp(`^${motoData.code}$`, 'i') };
      }

      if (motoData.nombre) {
        filter.nombre = { $regex: new RegExp(`^${motoData.nombre}$`, 'i') };
      }

      if (motoData.importado) {
        filter.importado = motoData.importado;
      }

      const motoFound = await this.motoModel
        .findOne(filter)
        .populate('modeloId')
        .populate('almacenId')
        .populate('proveedorId');

      if (!motoFound) {
        console.log('Moto Repository: Moto no encontrada');
        return null;
      }

      console.log('Moto Repository: Moto encontrado');
      return motoFound;
    } catch (error) {
      console.error(
        `Moto Repository: Error al buscar la moto: ${error.message}`
      );
      throw new Error(`Error al buscar la moto: ${error.message}`);
    }
  }
  async createMoto(motoData) {
    try {
      const newMoto = new this.motoModel(motoData);
      const motoSaved = await newMoto.save();

      // Populamos el campo segmentId después de guardar
      const populatedMoto = await motoSaved.populate([
        { path: 'modeloId' },
        { path: 'almacenId' },
        { path: 'proveedorId' },
      ]);

      console.log('Moto Repository: Moto creado correctamente');
      return populatedMoto;
    } catch (error) {
      console.log(`Moto Repository: Error al crear la moto: ${error.message}`);
      throw new Error(`Error al crear la moto: ${error.message}`);
    }
  }
}
