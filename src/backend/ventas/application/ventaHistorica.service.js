import { ventasHistoricasRepository } from '@/backend/ventas/domain/repositories/ventasHistoricasRepository';

export class VentaHistoricaService {
  constructor() {
    this.ventasHistoricasRepository = new ventasHistoricasRepository();
  }

  async getAllVentasHistoricas() {
    try {
      const ventasHistoricas = await this.ventasHistoricasRepository.getAllVentasHistoricas();

      if (ventasHistoricas?.length === 0) {
        console.log('Venta Historica Service: No se encontraron ventas históricas');
        return {
          status: 200,
          payload: [],
        };
      }
      console.log('Venta Historica Service: Ventas históricas encontradas');
      return {
        status: 200,
        payload: ventasHistoricas,
      };
    } catch (error) {
      console.error(
        `Venta Historica Service: Error interno al buscar todas las ventas históricas: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}