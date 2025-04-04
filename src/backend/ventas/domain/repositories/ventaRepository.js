import mongoose from 'mongoose';

import { Venta } from '@/backend/ventas/domain/models/venta';

export class VentaRepository {
  constructor() {
    this.ventaModel = Venta;
  }

  /**
   * Obtiene todas las ventas almacenadas en la base de datos
   * @async
   * @returns {Promise<Array>} Retorna un array con todas las ventas encontradas
   * @throws {Error} Si ocurre un error al buscar las ventas en la base de datos
   */
  async getAllVentas() {
    try {
      const ventas = await this.ventaModel.find({});

      if (ventas?.length === 0) {
        console.log('Venta Repository: No se encontraron ventas');
        return [];
      }

      console.log('Venta Repository: Ventas encontradas');
      return ventas;
    } catch (error) {
      console.error(
        `Venta Repository: Error al buscar todas las ventas: ${error}`
      );
      throw new Error(
        `Venta Repository: Error al buscar todas las ventas: ${error}`
      );
    }
  }

  async getVentaByData(ventaData) {
    try {
      if (!ventaData) {
        console.log('Venta Repository: Venta no proporcionada');
        return null;
      }

      const filter = {};

      if (ventaData.id) {
        filter._id = new mongoose.Types.ObjectId(ventaData.id);
      }

      if (ventaData.code) {
        filter.code = { $regex: new RegExp(`^${ventaData.code}$`, 'i') };
      }
      const ventaFound = await this.ventaModel.findOne(filter);

      if (!ventaFound) {
        console.log('Venta Repository: Venta no encontrada');
        return null;
      }

      console.log('Venta Repository: Venta encontrada');
      return ventaFound;
    } catch (error) {
      console.error(
        `Venta Repository: Error al buscar la venta: ${error.message}`
      );
      throw new Error(`Error al buscar una venta: ${error.message}`);
    }
  }

  async createVenta(ventaData) {
    try {
      const venta = new this.ventaModel(ventaData);

      const ventaCreated = await venta.save();

      if (!ventaCreated) {
        console.log('Venta Repository: Error al crear la venta');
        return null;
      }

      console.log('Venta Repository: Venta creada');
      return ventaCreated;
    } catch (error) {
      console.error(
        `Venta Repository: Error al crear la venta: ${error.message}`
      );
      throw new Error(
        `Venta Repository: Error al crear la venta: ${error.message}`
      );
    }
  }

  async updateVenta(ventaId, ventaData) {
    try {
      const updatedVenta = await this.ventaModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(ventaId) },
        ventaData,
        { new: true }
      );

      if (!updatedVenta) {
        console.log(
          'Venta Repository: Venta no encontrada para ser actualizada'
        );
        return null;
      }

      console.log('Venta Repository: Venta actualizada correctamente');
      return updatedVenta;
    } catch (error) {
      console.error(
        `Venta Repository: Error al actualizar la venta: ${error.message}`
      );
      throw new Error(`Error al actualizar la venta: ${error.message}`);
    }
  }

  async deleteVenta(ventaId) {
    try {
      const deletedVenta = await this.ventaModel.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(ventaId),
      });

      if (!deletedVenta) {
        console.log('Venta Repository: Venta no encontrada para ser eliminada');
        return null;
      }

      console.log('Venta Repository: Venta encontrada y eliminada');
      return deletedVenta;
    } catch (error) {
      console.error(
        `Venta Repository: Error al eliminar una venta: ${error.message}`
      );
      throw new Error(`Error al eliminar la venta: ${error.message}`);
    }
  }
}
