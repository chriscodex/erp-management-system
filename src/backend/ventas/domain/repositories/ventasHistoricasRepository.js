import { VentasHistoricas } from '@/backend/ventas/domain/models/ventasHistoricas';

export class ventasHistoricasRepository {
  constructor() {
    this.ventasHistoricasModel = VentasHistoricas;
  }
  
  async getAllVentasHistoricas() {
    try {
      const ventasHistoricas = await this.ventasHistoricasModel.find({});

      if (ventasHistoricas?.length === 0) {
        console.log('Venta Historica Repository: No se encontraron ventas');
        return [];
      }
      
      console.log('Venta Historica Repository: Ventas encontradas');
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


  async createVentaHistorica(ventasHistoricas) {
    try {
      const ventaHistorica = new this.ventasHistoricasModel(ventasHistoricas);

      const ventaHistoricaSaved = await ventaHistorica.save();

      if (!ventaHistoricaSaved) {
        console.log('Venta Historica Repository: Error al crear la venta');
        return null;
      }

      console.log('Venta Historica Repository: Venta creada');
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
