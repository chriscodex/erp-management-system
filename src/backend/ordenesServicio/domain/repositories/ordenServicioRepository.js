import mongoose from 'mongoose';

import { OrdenServicio } from '@/backend/ordenesServicio/domain/models/ordenServicio';
import { Cliente } from '@/backend/clientes/domain/models/cliente';
import { Product } from '@/backend/products/domain/models/product';
import { User } from '@/backend/users/domain/models/user';

export class OrdenServicioRepository {
  constructor() {
    this.ordenServicioModel = OrdenServicio;
    this.clienteModel = Cliente;
    this.productModel = Product;
    this.userModel = User;
  }

  async getAllOrdenesDeServicio() {
    try {
      const ordenesDeServicio = await this.ordenServicioModel.find({}).populate('cliente.clienteId').populate('mecanicos.userId').populate('productos.productId');

      if (ordenesDeServicio?.length === 0) {
        console.log('Orden De Servicio Repository: No se encontraron ordenes de servicios');
        return [];
      }

      console.log('Orden De Servicio Repository: Ordenes de servicios encontradas');
      return ordenesDeServicio;
    } catch (error) {
      console.error(
        `Orden De Servicio Repository: Error al buscar todas las órdenes de servicio: ${error}`
      );
      throw new Error(
        `Orden De Servicio Repository: Error al buscar todas las órdenes de servicio: ${error}`
      );
    }
  }
  async getOrdenDeServicioByData(ordenDeServicioData) {
    try {
      if (!ordenDeServicioData) {
        console.log('Orden De Servicio Repository: Orden de servicio no proporcionada');
        return null;
      }

      const filter = {};

      if (ordenDeServicioData.id) {
        filter._id = new mongoose.Types.ObjectId(ordenDeServicioData.id);
      }

      if (ordenDeServicioData.code) {
        filter.code = { $regex: new RegExp(`^${ordenDeServicioData.code}$`, 'i') };
      }
      const ordenDeServicioFound = await this.ordenServicioModel.findOne(filter).populate('cliente.clienteId').populate('mecanicos.userId').populate('productos.productId');

      if (!ordenDeServicioFound) {
        console.log('Orden De Servicio Repository: Orden de servicio no encontrada');
        return null;
      }

      console.log('Orden De Servicio Repository: Orden de servicio encontrada');
      return ordenDeServicioFound;
    } catch (error) {
      console.error(
        `Orden De Servicio Repository: Error al buscar la orden de servicio: ${error.message}`
      );
      throw new Error(`Error al buscar una orden de servicio: ${error.message}`);
    }
  }

  async createOrdenDeServicio(ordenDeServicioData) {
    try {
      const newOrdenDeServicio = new this.ordenServicioModel(ordenDeServicioData);
      const savedOrdenDeServicio = await newOrdenDeServicio.save();

      console.log('Orden De Servicio Repository: Orden de servicio creada correctamente');
      return savedOrdenDeServicio;
    } catch (error) {
      console.log(
        `Orden De Servicio Repository: Error al crear orden de servicio: ${error.message}`
      );
      throw new Error(`Error al crear orden de servicio: ${error.message}`);
    }
  }

  async updateOrdenDeServicio(ordenDeServicioId, ordenDeServicioData) {
    try {
      const updatedOrdenDeServicio = await this.ordenServicioModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(ordenDeServicioId) },
        ordenDeServicioData,
        {
          new: true,
        }
      );

      if (!updatedOrdenDeServicio) {
        console.log(
          'Orden De Servicio Repository: Ordne de servicio no encontrada para ser actualizada'
        );
        return null;
      }

      console.log('Orden De Servicio Repository: Orden de servicio actualizada correctamente');
      return updatedOrdenDeServicio;
    } catch (error) {
      console.error(
        `Orden De Servicio Repository: Error al actualizar la orden de servicio: ${error.message}`
      );
      throw new Error(`Error al actualizar la orden de servicio: ${error.message}`);
    }
  }

  async deleteOrdenDeServicio(ordenDeServicioId) {
    try {
      const deletedOrdenDeServicio = await this.ordenServicioModel.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(ordenDeServicioId),
      });

      if (!deletedOrdenDeServicio) {
        console.log(
          'Orden De Servicio Repository: Orden de servicio no encontrada para ser eliminada'
        );
        return null;
      }

      console.log('Orden De Servicio Repository: Orden de servicio encontrada y eliminada');
      return deletedOrdenDeServicio;
    } catch (error) {
      console.error(
        `Orden De Servicio Repository: Error al eliminar una orden de servicio: ${error.message}`
      );
      throw new Error(`Error al eliminar la orden de servicio: ${error.message}`);
    }
  }
}
