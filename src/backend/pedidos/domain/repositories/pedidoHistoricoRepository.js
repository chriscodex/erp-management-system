import { PedidoHistorico } from '@/backend/pedidos/domain/models/pedidoHistorico';

export class PedidoHistoricoRepository {
  constructor() {
    this.pedidoHistoricoModel = PedidoHistorico;
  }

  async getAllPedidosHistoricos() {
    try {
      const pedidosHistoricos = await this.pedidoHistoricoModel.find({});

      if (pedidosHistoricos?.length === 0) {
        console.log(
          'Pedido Historico Repository: No se encontraron pedidos historicos',
        );
        return [];
      }

      console.log(
        'Pedido Historico Repository: Pedidos historicos encontrados',
      );
      return pedidosHistoricos;
    } catch (error) {
      console.error(
        `Pedido Historico Repository: Error al buscar todos los pedidos historicos: ${error}`,
      );
      throw new Error(
        `Pedido Historico Repository: Error al buscar todos los pedidos historicos: ${error}`,
      );
    }
  }

  async createPedidoHistorico(pedidoHistoricoData) {
    try {
      const pedidoHistorico = new this.pedidoHistoricoModel(
        pedidoHistoricoData,
      );

      const pedidoHistoricoSaved = await pedidoHistorico.save();

      if (!pedidoHistoricoSaved) {
        console.log(
          'Pedido Historico Repository: Error al crear el pedido historico',
        );
        return null;
      }

      console.log('Pedido Historico Repository: Pedido historico creado');
      return pedidoHistoricoSaved;
    } catch (error) {
      console.error(
        `Pedido Historico Repository: Error al crear el pedido historico: ${error.message}`,
      );
      throw new Error(
        `Pedido Historico Repository: Error al crear el pedido historico: ${error.message}`,
      );
    }
  }
}
