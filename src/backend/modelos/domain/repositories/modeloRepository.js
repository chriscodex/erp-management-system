import mongoose from 'mongoose';

import { Modelo } from '@/backend/modelos/domain/models/modelo';

export class ModeloRepository {
  constructor() {
    this.modeloModel = Modelo;
  }

  async getAllModelos() {
    try {
      const modelos = await this.modeloModel
        .find()
        .populate('marcaId')
        .populate('categoryId');

      if (modelos?.length === 0) {
        console.log('Modelo Repository: No se encontraron modelos');
        return [];
      }

      console.log('Modelo Repository: Modelos encontrados');
      return modelos;
    } catch (error) {
      console.error(
        `Modelo Repository: Error al buscar todos los modelos: ${error.message}`,
      );
      throw new Error(
        `Modelo Repository: Error al buscar todos los modelos: ${error.message}`,
      );
    }
  }
  async getAllModelosUnpopulated() {
    try {
      const modelos = await this.modeloModel.find();

      if (modelos?.length === 0) {
        console.log('Modelo Repository: No se encontraron modelos');
        return [];
      }

      console.log('Modelo Repository: Modelos encontrados');
      return modelos;
    } catch (error) {
      console.error(
        `Modelo Repository: Error al buscar todos los modelos: ${error.message}`,
      );
      throw new Error(
        `Modelo Repository: Error al buscar todos los modelos: ${error.message}`,
      );
    }
  }

  async getModeloByData(modeloData) {
    try {
      if (!modeloData) {
        console.log('Modelo Repository: Modelo no proporcionado');
        return null;
      }

      const filter = {};

      if (modeloData.id) {
        filter._id = new mongoose.Types.ObjectId(modeloData.id);
      }

      if (modeloData.marcaId) {
        filter.marcaId = new mongoose.Types.ObjectId(modeloData.marcaId);
      }

      if (modeloData.categoryId) {
        filter.categoryId = new mongoose.Types.ObjectId(modeloData.categoryId);
      }

      if (modeloData.code) {
        filter.code = { $regex: new RegExp(`^${modeloData.code}$`, 'i') };
      }

      if (modeloData.nombre) {
        filter.nombre = { $regex: new RegExp(`^${modeloData.nombre}$`, 'i') };
      }

      const modeloFound = await this.modeloModel
        .findOne(filter)
        .populate('marcaId')
        .populate('categoryId');

      if (!modeloFound) {
        console.log('Modelo Repository: Modelo no encontrado');
        return null;
      }

      console.log('Modelo Repository: Modelo encontrado');
      return modeloFound;
    } catch (error) {
      console.error(
        `Modelo Repository: Error al buscar el modelo: ${error.message}`,
      );
      throw new Error(`Error al buscar el modelo: ${error.message}`);
    }
  }

  async createModelo(modeloData) {
    try {
      const newModelo = new this.modeloModel(modeloData);
      const savedModelo = await newModelo.save();

      // Populamos el campo segmentId después de guardar
      const populatedModelo = await savedModelo.populate([
        { path: 'marcaId' },
        { path: 'categoryId' },
      ]);

      console.log('Modelo Repository: Modelo creado correctamente');
      return populatedModelo;
    } catch (error) {
      console.log(
        `Modelo Repository: Error al crear el modelo: ${error.message}`,
      );
      throw new Error(`Error al crear el modelo: ${error.message}`);
    }
  }
  async updateModelo(modeloId, modeloData) {
    try {
      const updatedModelo = await this.modeloModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(modeloId) },
        modeloData,
        {
          new: true,
        },
      );

      if (!updatedModelo) {
        console.log(
          'Modelo Repository: Modelo no encontrado para ser actualizado',
        );
        return null;
      }

      console.log('Modelo Repository: Modelo actualizado correctamente');
      return updatedModelo;
    } catch (error) {
      console.error(
        `Modelo Repository: Error al actualizar el modelo: ${error.message}`,
      );
      throw new Error(`Error al actualizar el modelo: ${error.message}`);
    }
  }
  async deleteModelo(id) {
    try {
      const modeloDeleted = await this.modeloModel.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(id),
      });

      if (!modeloDeleted) {
        console.log(
          'Modelo Repository: Modelo no encontrado para ser eliminado',
        );
        return null;
      }

      console.log('Modelo Repository: Modelo encontrado y eliminado');
      return modeloDeleted;
    } catch (error) {
      console.error(
        `Modelo Repository: Error al eliminar el modelo: ${error.message}`,
      );
      throw new Error(`Error al eliminar el modelo: ${error.message}`);
    }
  }
}
