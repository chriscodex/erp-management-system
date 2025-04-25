import mongoose from 'mongoose';
import { VentasHistoricas } from "@/backend/ventas/domain/models/ventasHistoricas";

export class ventasHistoricasRepository {
  constructor() {
    this.ventasHistoricasModel = VentasHistoricas;
  }

  async getAllVentasHistoricas() {
    try {
      const ventasHistoricas = await this.ventasHistoricasModel.find({});

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
      const ventaHistoricaFound = await this.ventasHistoricasModel.findOne(filter);

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
