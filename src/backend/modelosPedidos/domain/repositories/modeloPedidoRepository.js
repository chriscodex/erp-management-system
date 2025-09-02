import mongoose from 'mongoose';

import { ModeloPedido } from '@/backend/modelosPedidos/domain/models/modeloPedido';

export class ModeloPedidoRepository {
  constructor() {
    this.modeloPedidoModel = ModeloPedido;
  }

  async getAllModelosPedidos() {
    try {
      const modelosPedidos = await this.modeloPedidoModel
        .find()
        .populate('marcaId')
        .populate('categoryId');

      if (modelosPedidos?.length === 0) {
        console.log('Modelo Pedido Repository: No se encontraron modelos');
        return [];
      }

      console.log('Modelo Pedido Repository: Modelos encontrados');
      return modelosPedidos;
    } catch (error) {
      console.error(
        `Modelo Pedido Repository: Error al buscar todos los modelos: ${error.message}`,
      );
      throw new Error(
        `Modelo Pedido Repository: Error al buscar todos los modelos: ${error.message}`,
      );
    }
  }
  async getAllModelosPedidosUnpopulated() {
    try {
      const modelosPedidos = await this.modeloPedidoModel.find();

      if (modelosPedidos?.length === 0) {
        console.log('Modelo Pedido Repository: No se encontraron modelos');
        return [];
      }

      console.log('Modelo Pedido Repository: Modelos encontrados');
      return modelosPedidos;
    } catch (error) {
      console.error(
        `Modelo Pedido Repository: Error al buscar todos los modelos: ${error.message}`,
      );
      throw new Error(
        `Modelo Pedido Repository: Error al buscar todos los modelos: ${error.message}`,
      );
    }
  }

  async getModeloPedidoByData(modeloPedidoData) {
    try {
      if (!modeloPedidoData) {
        console.log('Modelo Pedido Repository: Modelo no proporcionado');
        return null;
      }

      const filter = {};

      if (modeloPedidoData.id) {
        filter._id = new mongoose.Types.ObjectId(modeloPedidoData.id);
      }

      if (modeloPedidoData.marcaId) {
        filter.marcaId = new mongoose.Types.ObjectId(modeloPedidoData.marcaId);
      }

      if (modeloPedidoData.categoryId) {
        filter.categoryId = new mongoose.Types.ObjectId(
          modeloPedidoData.categoryId,
        );
      }

      if (modeloPedidoData.code) {
        filter.code = { $regex: new RegExp(`^${modeloPedidoData.code}$`, 'i') };
      }

      if (modeloPedidoData.nombre) {
        filter.nombre = {
          $regex: new RegExp(`^${modeloPedidoData.nombre}$`, 'i'),
        };
      }

      const modeloPedidoFound = await this.modeloPedidoModel
        .findOne(filter)
        .populate('marcaId')
        .populate('categoryId');

      if (!modeloPedidoFound) {
        console.log('Modelo Pedido Repository: Modelo no encontrado');
        return null;
      }

      console.log('Modelo Pedido Repository: Modelo encontrado');
      return modeloPedidoFound;
    } catch (error) {
      console.error(
        `Modelo Pedido Repository: Error al buscar el modelo: ${error.message}`,
      );
      throw new Error(`Error al buscar el modelo: ${error.message}`);
    }
  }

  async createModeloPedido(modeloPedidoData) {
    try {
      const newModeloPedido = new this.modeloPedidoModel(modeloPedidoData);
      const savedModeloPedido = await newModeloPedido.save();

      // Populamos el campo segmentId después de guardar
      const populatedModeloPedido = await savedModeloPedido.populate([
        { path: 'marcaId' },
        { path: 'categoryId' },
      ]);

      console.log('Modelo Pedido Repository: Modelo creado correctamente');
      return populatedModeloPedido;
    } catch (error) {
      console.log(
        `Modelo Pedido Repository: Error al crear el modelo: ${error.message}`,
      );
      throw new Error(`Error al crear el modelo: ${error.message}`);
    }
  }
  async updateModeloPedido(modeloPedidoId, modeloPedidoData) {
    try {
      const updatedModeloPedido = await this.modeloPedidoModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(modeloPedidoId) },
        modeloPedidoData,
        {
          new: true,
        },
      );

      if (!updatedModeloPedido) {
        console.log(
          'Modelo Pedido Repository: Modelo no encontrado para ser actualizado',
        );
        return null;
      }

      console.log('Modelo Pedido Repository: Modelo actualizado correctamente');
      return updatedModeloPedido;
    } catch (error) {
      console.error(
        `Modelo Pedido Repository: Error al actualizar el modelo: ${error.message}`,
      );
      throw new Error(`Error al actualizar el modelo: ${error.message}`);
    }
  }
  async deleteModeloPedido(id) {
    try {
      const modeloPedidoDeleted = await this.modeloPedidoModel.findOneAndDelete(
        {
          _id: new mongoose.Types.ObjectId(id),
        },
      );

      if (!modeloPedidoDeleted) {
        console.log(
          'Modelo Pedido Repository: Modelo no encontrado para ser eliminado',
        );
        return null;
      }

      console.log('Modelo Pedidos Repository: Modelo encontrado y eliminado');
      return modeloPedidoDeleted;
    } catch (error) {
      console.error(
        `Modelo Pedido Repository: Error al eliminar el modelo: ${error.message}`,
      );
      throw new Error(`Error al eliminar el modelo: ${error.message}`);
    }
  }
}
