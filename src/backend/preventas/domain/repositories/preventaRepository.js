import mongoose from 'mongoose';

import { Preventa } from '@/backend/preventas/domain/models/preventa';

export class PreventaRepository {
  constructor() {
    this.preventaModel = Preventa;
  }

  async getAllPreventas() {
    try {
      const preventas = await this.preventaModel.find({});

      if (preventas?.length === 0) {
        console.log('Preventa Repository: No se encontraron preventas');
        return [];
      }

      console.log('Preventa Repository: Preventas encontradas');
      return preventas;
    } catch (error) {
      console.error(
        `Preventa Repository: Error al buscar todas las preventas: ${error}`
      );
      throw new Error(
        `Preventa Repository: Error al buscar todas las preventas: ${error}`
      );
    }
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

  async updatePreventa(preventaId, preventaData) {
    try {
      const updatedPreventa = await this.preventaModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(preventaId) },
        preventaData,
        {
          new: true,
        }
      );

      if (!updatedPreventa) {
        console.log(
          'Preventa Repository: Preventa no encontrada para ser actualizada'
        );
        return null;
      }

      console.log('Preventa Repository: Preventa actualizada correctamente');
      return updatedPreventa;
    } catch (error) {
      console.error(
        `Preventa Repository: Error al actualizar la preventa: ${error.message}`
      );
      throw new Error(`Error al actualizar la preventa: ${error.message}`);
    }
  }

  async deletePreventa(preventaId) {
    try {
      const deletedPreventa = await this.preventaModel.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(preventaId),
      });

      if (!deletedPreventa) {
        console.log(
          'Preventa Repository: Preventa no encontrada para ser eliminada'
        );
        return null;
      }

      console.log('Preventa Repository: Preventa encontrada y eliminada');
      return deletedPreventa;
    } catch (error) {
      console.error(
        `Preventa Repository: Error al eliminar una preventa: ${error.message}`
      );
      throw new Error(`Error al eliminar la preventa: ${error.message}`);
    }
  }
}
