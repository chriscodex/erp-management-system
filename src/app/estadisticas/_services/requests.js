import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';
import { VentaHistoricaService } from '@/backend/ventas/application/ventaHistorica.service';
import { PedidoHistoricoService} from '@/backend/pedidos/application/pedidoHistorico.service';
import { OrdenServicioHistoricaService } from '@/backend/ordenesServicio/application/ordenServicioHistorica.service';

export async function getAllVentasHistoricasRequestServer() {
  try {
    await connectDB();
    const ventasHistoricasService = new VentaHistoricaService();

    const response = await ventasHistoricasService.getAllVentasHistoricas();

    if (response?.status !== 200) {
      console.log('Error al obtener todas las ventas historicas');
      return { ventasHistoricas: [], status: 500 };
    }
    const ventasHistoricas = response?.payload;
    return {
      ventasHistoricas: simplificadorParaClientComponent(ventasHistoricas),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllPedidosHistoricosRequestServer() {
  try {
    await connectDB();

    const pedidoHistoricoService = new PedidoHistoricoService();

    const response = await pedidoHistoricoService.getAllPedidosHistoricos();

    if (response?.status !== 200) {
      console.log('Error al obtener todas los pedidos históricos');
      return { pedidosHistoricos: [], status: 500 };
    }
    const pedidosHistoricos = response?.payload;
    return {
      pedidosHistoricos: simplificadorParaClientComponent(pedidosHistoricos),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllOrdenesServicioHistoricasRequestServer() {
  try {
    await connectDB();

    const ordenesServicioHistoricasService = new OrdenServicioHistoricaService();

    const response = await ordenesServicioHistoricasService.getAllOrdenesDeServicioHistoricas();

    if (response?.status !== 200) {
      console.log('Error al obtener todas las órdenes históricas');
      return { ordenesServicioHistoricas: [], status: 500 };
    }
    const ordenesServicioHistoricas = response?.payload;
    return {
      ordenesServicioHistoricas: simplificadorParaClientComponent(ordenesServicioHistoricas),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}