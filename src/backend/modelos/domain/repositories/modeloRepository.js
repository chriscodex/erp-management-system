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
        .populate('segmentId')
        .populate('marcaId')
        .populate('categoryId')
        .populate('almacenId')
        .populate('proveedorId');

      if (modelos.length === 0) {
        console.log('Modelo Repository: No se encontraron modelos');
        return [];
      }

      console.log('Modelo Repository: Modelos encontrados');
      return modelos;
    } catch (error) {
      console.error(
        `Modelo Repository: Error al buscar todos los modelos: ${error.message}`
      );
      throw new Error(
        `Modelo Repository: Error al buscar todos los modelos: ${error.message}`
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

      if (modeloData.segmentId) {
        filter.segmentId = new mongoose.Types.ObjectId(modeloData.segmentId);
      }

      if (modeloData.marcaId) {
        filter.marcaId = new mongoose.Types.ObjectId(modeloData.marcaId);
      }

      if (modeloData.categoryId) {
        filter.categoryId = new mongoose.Types.ObjectId(modeloData.categoryId);
      }

      if (modeloData.almacenId) {
        filter.almacenId = new mongoose.Types.ObjectId(modeloData.almacenId);
      }

      if (modeloData.proveedorId) {
        filter.proveedorId = new mongoose.Types.ObjectId(
          modeloData.proveedorId
        );
      }

      if (modeloData.code) {
        filter.code = { $regex: new RegExp(`^${modeloData.code}$`, 'i') };
      }

      if (modeloData.nombre) {
        filter.nombre = { $regex: new RegExp(`^${modeloData.nombre}$`, 'i') };
      }

      const modeloFound = await this.modeloModel
        .findOne(filter)
        .populate('segmentId')
        .populate('marcaId')
        .populate('categoryId')
        .populate('almacenId')
        .populate('proveedorId');

      if (!modeloFound) {
        console.log('Modelo Repository: Modelo no encontrado');
        return null;
      }

      console.log('Modelo Repository: Modelo encontrado');
      return modeloFound;
    } catch (error) {
      console.error(
        `Modelo Repository: Error al buscar el modelo: ${error.message}`
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
        { path: 'segmentId' },
        { path: 'marcaId' },
        { path: 'categoryId' },
        { path: 'almacenId' },
        { path: 'proveedorId' },
      ]);

      console.log('Modelo Repository: Modelo creado correctamente');
      return populatedModelo;
    } catch (error) {
      console.log(
        `Modelo Repository: Error al crear el modelo: ${error.message}`
      );
      throw new Error(`Error al crear el modelo: ${error.message}`);
    }
  }
}
