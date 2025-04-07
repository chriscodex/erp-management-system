import { VentasHistoricas } from '@/backend/ventas/domain/models/ventasHistoricas';

export class ventasHistoricasRepository {
  constructor() {
    this.ventasHistoricasModel = VentasHistoricas;
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
