import mongoose from 'mongoose';

import { Preventa } from '@/backend/preventas/domain/models/preventa';

export class PreventaRepository {
  constructor() {
    this.preventaModel = Preventa;
  }

  async getPreventaByData(preventaData) {
    try {
      if (!preventaData) {
        console.log('Preventa Repository: Preventa no proporcionada');
        return null;
      }

      const filter = {};

      if (preventaData.id) {
        filter._id = new mongoose.Types.ObjectId(preventaData.id);
      }

      if (preventaData.code) {
        filter.code = { $regex: new RegExp(`^${preventaData.code}$`, 'i') };
      }
      const preventaFound = await this.preventaModel.findOne(filter);

      if (!preventaFound) {
        console.log('Preventa Repository: Preventa no encontrada');
        return null;
      }

      console.log('Preventa Repository: Preventa encontrada');
      return preventaFound;
    } catch (error) {
      console.error(
        `Preventa Repository: Error al buscar la preventa: ${error.message}`
      );
      throw new Error(`Error al buscar una preventa: ${error.message}`);
    }
  }

  async createPreventa(preventaData) {
    try {
      const newPreventa = new this.preventaModel(preventaData);
      const savedPreventa = await newPreventa.save();

      console.log('Preventa Repository: Preventa creada correctamente');
      return savedPreventa;
    } catch (error) {
      console.log(
        `Preventa Repository: Error al crear preventa: ${error.message}`
      );
      throw new Error(`Error al crear preventa: ${error.message}`);
    }
  }
}
