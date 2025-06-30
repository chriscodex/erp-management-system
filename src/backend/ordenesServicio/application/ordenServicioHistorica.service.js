import { OrdenServicioHistoricaRepository } from '@/backend/ordenesServicio/domain/repositories/ordenServicioHistoricaRepository';

export class OrdenServicioHistoricaService {
  constructor() {
    this.ordenServicioHistoricaRepository = new OrdenServicioHistoricaRepository();
  }

  async getAllOrdenesDeServicioHistoricas() {
    try {
      const ordenesDeServicioHistoricas = await this.ordenServicioHistoricaRepository.getAllOrdenesDeServicioHistoricas();

      if (ordenesDeServicioHistoricas?.length === 0) {
        console.log('Orden de Servicio Historica Service: No se encontraron ordenes de servicio históricas');
        return {
          status: 200,
          payload: [],
        };
      }
      console.log('Orden de Servicio Historica Service: Órdenes de servicio históricas encontradas');
      return {
        status: 200,
        payload: ordenesDeServicioHistoricas,
      };
    } catch (error) {
      console.error(
        `Orden de Servicio Historica Service: Error interno al buscar todas las ordenes de servicio históricas: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getOrdenDeServicioHistoricaByData(ordenDeServicioHistoricaData) {
    try {
      const ordenDeServicioHistoricaFound = await this.ordenServicioHistoricaRepository.getOrdenDeServicioHistoricaByData(ordenDeServicioHistoricaData);

      if (!ordenDeServicioHistoricaFound) {
        console.log('Orden de Servicio Historica Service: La orden de servicio historica no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Orden de Servicio Historica Service: La orden de servicio historica existe');
      return {
        status: 200,
        payload: ordenDeServicioHistoricaFound,
      };
    } catch (error) {
      console.error(
        `Orden de Servicio Historica Service: Error interno al buscar la orden de servicio historica: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getOrdenesDeServicioHistoricasByCliente(clientId) {
    try {
      const ordenesDeServicioHistoricasFound = await this.ordenServicioHistoricaRepository.getOrdenesDeServicioHistoricasByCliente(clientId);

      if (!ordenesDeServicioHistoricasFound) {
        console.log('Orden de Servicio Historica Service: Las órdenes de servicio historicas no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Orden de Servicio Historica Service: Las órdenes de servicio historicas existe');
      return {
        status: 200,
        payload: ordenesDeServicioHistoricasFound,
      };
    } catch (error) {
      console.error(
        `Orden de Servicio Historica Service: Error interno al buscar las órdenes de servicio historicas: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getOrdenesDeServicioHistoricasByUser(userId) {
    try {
      const ordenesDeServicioHistoricasFound = await this.ordenServicioHistoricaRepository.getOrdenesDeServicioHistoricasByUser(userId);

      if (!ordenesDeServicioHistoricasFound) {
        console.log('Orden de Servicio Historica Service: Las ventas históricas no existen');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Orden de Servicio Historica Service: Las ventas historicas existen');
      return {
        status: 200,
        payload: ordenesDeServicioHistoricasFound,
      };
    } catch (error) {
      console.error(
        `Orden de Servicio Historica Service: Error interno al buscar las ventas historicas: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}

