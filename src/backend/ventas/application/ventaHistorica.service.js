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
  async getVentaHistoricaByData(ventaHistoricaData) {
    try {
      const ventaHistoricaFound = await this.ventasHistoricasRepository.getVentaHistoricaByData(ventaHistoricaData);

      if (!ventaHistoricaFound) {
        console.log('Venta Historica Service: La venta histórica no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Venta Historica Service: La venta historica existe');
      return {
        status: 200,
        payload: ventaHistoricaFound,
      };
    } catch (error) {
      console.error(
        `Venta Historica Service: Error interno al buscar la venta historica: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getVentasHistoricasByCliente(clientId) {
    try {
      const ventasHistoricasFound = await this.ventasHistoricasRepository.getVentasHistoricasByCliente(clientId);

      if (!ventasHistoricasFound) {
        console.log('Venta Historica Service: Las ventas históricas no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Venta Historica Service: Las ventas historicas existe');
      return {
        status: 200,
        payload: ventasHistoricasFound,
      };
    } catch (error) {
      console.error(
        `Venta Historica Service: Error interno al buscar las ventas historicas: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}

