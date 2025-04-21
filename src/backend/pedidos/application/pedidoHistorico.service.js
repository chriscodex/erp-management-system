import { PedidoHistoricoRepository } from '@/backend/pedidos/domain/repositories/pedidoHistoricoRepository';

export class PedidoHistoricoService {
  constructor() {
    this.pedidoHistoricoRepository = new PedidoHistoricoRepository();
  }

  async getAllPedidosHistoricos() {
    try {
      const pedidosHistoricos = await this.pedidoHistoricoRepository.getAllPedidosHistoricos();

      if (pedidosHistoricos?.length === 0) {
        console.log('Pedido Historico Service: No se encontraron pedidos históricos');
        return {
          status: 200,
          payload: [],
        };
      }
      console.log('Pedido Historico Service: Pedidos históricos encontrados');
      return {
        status: 200,
        payload: pedidosHistoricos,
      };
    } catch (error) {
      console.error(
        `Pedido Historico Service: Error interno al buscar todos los pedidos históricos: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}