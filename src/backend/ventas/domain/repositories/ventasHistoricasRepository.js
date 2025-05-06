import mongoose from 'mongoose';
import { VentasHistoricas } from "@/backend/ventas/domain/models/ventasHistoricas";
import { Cliente } from '@/backend/clientes/domain/models/cliente';
import { User } from '@/backend/users/domain/models/user';
export class ventasHistoricasRepository {
  constructor() {
    this.ventasHistoricasModel = VentasHistoricas;
    this.clienteModel = Cliente;
    this.userModel = User;
  }

  async getAllVentasHistoricas() {
    try {
      const ventasHistoricas = await this.ventasHistoricasModel.find({}).populate('clienteId').populate('usuario.id');

      if (ventasHistoricas?.length === 0) {
        console.log("Venta Historica Repository: No se encontraron ventas");
        return [];
      }

      console.log("Venta Historica Repository: Ventas encontradas");
      return ventasHistoricas;
    } catch (error) {
      console.error(
        `Venta Historica Repository: Error al buscar todas las ventas: ${error}`
      );
      throw new Error(
        `Venta Historica Repository: Error al buscar todas las ventas: ${error}`
      );
    }
  }

  async getVentaHistoricaByData(ventaHistorica) {
    try {
      if (!ventaHistorica) {
        console.log("Venta Historica Repository: Venta historica no proporcionada");
        return null;
      }

      const filter = {};

      if (ventaHistorica.id) {
        filter._id = new mongoose.Types.ObjectId(ventaHistorica.id);
      }

      if (ventaHistorica.code) {
        filter.code = { $regex: new RegExp(`^${ventaHistorica.code}$`, "i") };
      }
      const ventaHistoricaFound = await this.ventasHistoricasModel.findOne(filter).populate('clienteId').populate('usuario.id');

      if (!ventaHistoricaFound) {
        console.log("Venta Historica Repository: Venta historica no encontrada");
        return null;
      }

      console.log("Venta Historica Repository: Venta historica encontrada");
      return ventaHistoricaFound;
    } catch (error) {
      console.error(
        `Venta Historica Repository: Error al buscar la venta historica: ${error.message}`
      );
      throw new Error(`Error al buscar una venta historica: ${error.message}`);
    }
  }
  async getVentasHistoricasByCliente(clienteId) {
    try {
      const ventas = await this.ventasHistoricasModel
        .find({ clienteId: new mongoose.Types.ObjectId(clienteId) })
        .sort({ fecha: -1 })
        .populate('clienteId')
        .populate('usuario.id');
  
      return ventas;
    } catch (error) {
      throw new Error(`Error al buscar ventas historicas del cliente: ${error.message}`);
    }
  }

  async getVentasHistoricasByUser(userId) {
    try {
      const ventas = await this.ventasHistoricasModel
        .find({ 'usuario.id': new mongoose.Types.ObjectId(userId) })
        .sort({ fecha: -1 })
        .populate('clienteId')
        .populate('usuario.id');
  
      return ventas;
    } catch (error) {
      throw new Error(`Error al buscar ventas historicas del vendedor: ${error.message}`);
    }
  }

  async createVentaHistorica(ventasHistoricas) {
    try {
      const ventaHistorica = new this.ventasHistoricasModel(ventasHistoricas);

      const ventaHistoricaSaved = await ventaHistorica.save();

      if (!ventaHistoricaSaved) {
        console.log("Venta Historica Repository: Error al crear la venta");
        return null;
      }

      console.log("Venta Historica Repository: Venta creada");
      return ventaHistoricaSaved;
    } catch (error) {
      console.error(
        `Venta Historica Repository: Error al crear la venta: ${error.message}`
      );
      throw new Error(
        `Venta Historica Repository: Error al crear la venta: ${error.message}`
      );
    }
  }
}
