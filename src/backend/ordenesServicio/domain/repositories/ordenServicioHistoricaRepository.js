import mongoose from 'mongoose';
import { OrdenServicioHistorica } from '@/backend/ordenesServicio/domain/models/ordenServicioHistorica';
import { Cliente } from '@/backend/clientes/domain/models/cliente';
import { Product } from '@/backend/products/domain/models/product';
import { User } from '@/backend/users/domain/models/user';
export class OrdenServicioHistoricaRepository {
  constructor() {
    this.ordenServicioHistoricaModel = OrdenServicioHistorica;
    this.clienteModel = Cliente;
    this.productModel = Product;
    this.userModel = User;
  }

  async getAllOrdenesDeServicioHistoricas() {
    try {
      const ordenesServicioHistoricas = await this.ordenServicioHistoricaModel
        .find({})
        .populate('cliente.clienteId')
        .populate('mecanicos.userId')
        .populate('productos.productId');

      if (ordenesServicioHistoricas?.length === 0) {
        console.log(
          'Orden de Servicio Historica Repository: No se encontraron ordenes de servicio',
        );
        return [];
      }

      console.log(
        'Orden de Servicio Historica Repository: Ordenes de servicio encontradas',
      );
      return ordenesServicioHistoricas;
    } catch (error) {
      console.error(
        `Orden de Servicio Historica Repository: Error al buscar todas las ordenes de servicio: ${error}`,
      );
      throw new Error(
        `Orden de Servicio Historica Repository: Error al buscar todas las ordenes de servicio: ${error}`,
      );
    }
  }

  async getOrdenDeServicioHistoricaByData(ordenDeServicio) {
    try {
      if (!ordenDeServicio) {
        console.log(
          'Orden de Servicio Historial Repository: Orden de servicio historica no proporcionada',
        );
        return null;
      }

      const filter = {};

      if (ordenDeServicio.id) {
        filter._id = new mongoose.Types.ObjectId(ordenDeServicio.id);
      }

      if (ordenDeServicio.code) {
        filter.code = { $regex: new RegExp(`^${ordenDeServicio.code}$`, 'i') };
      }
      const ordenDeServicioHistoricaFound =
        await this.ordenServicioHistoricaModel
          .findOne(filter)
          .populate('cliente.clienteId')
          .populate('mecanicos.userId')
          .populate('productos.productId');

      if (!ordenDeServicioHistoricaFound) {
        console.log(
          'Orden de Servicio Historial Repository: Orden de servicio historica no encontrada',
        );
        return null;
      }

      console.log(
        'Orden de Servicio Historial Repository: Orden de servicio historica encontrada',
      );
      return ordenDeServicioHistoricaFound;
    } catch (error) {
      console.error(
        `Orden de Servicio Historial Repository: Error al buscar la orden de servicio historica: ${error.message}`,
      );
      throw new Error(
        `Error al buscar una orden de servicio historica: ${error.message}`,
      );
    }
  }
  async getOrdenesDeServicioHistoricasByCliente(clienteId) {
    try {
      const ventas = await this.ventasHistoricasModel
        .find({ clienteId: new mongoose.Types.ObjectId(clienteId) })
        .sort({ fecha: -1 })
        .populate('clienteId')
        .populate('usuario.id');

      return ventas;
    } catch (error) {
      throw new Error(
        `Error al buscar ventas historicas del cliente: ${error.message}`,
      );
    }
  }

  async getOrdenesDeServicioHistoricasByUser(userId) {
    try {
      const ventas = await this.ventasHistoricasModel
        .find({ 'usuario.id': new mongoose.Types.ObjectId(userId) })
        .sort({ fecha: -1 })
        .populate('clienteId')
        .populate('usuario.id');

      return ventas;
    } catch (error) {
      throw new Error(
        `Error al buscar ventas historicas del vendedor: ${error.message}`,
      );
    }
  }

  async createOrdenDeServicioHistorica(ordenDeServicioHistoricaData) {
    try {
      const ordenDeServicioHistorica = new this.ordenServicioHistoricaModel(
        ordenDeServicioHistoricaData,
      );

      const ordenDeServicioHistoricaSaved =
        await ordenDeServicioHistorica.save();

      if (!ordenDeServicioHistoricaSaved) {
        console.log(
          'Orden de Servicio Historica Repository: Error al crear la orden de servicio',
        );
        return null;
      }

      console.log(
        'Orden de Servicio Historica Repository: Orden de servicio creada',
      );
      return ordenDeServicioHistoricaSaved;
    } catch (error) {
      console.error(
        `Orden de Servicio Historica Repository: Error al crear la orden de servicio: ${error.message}`,
      );
      throw new Error(
        `Orden de Servicio Historica Repository: Error al crear la orden de servicio: ${error.message}`,
      );
    }
  }
}
