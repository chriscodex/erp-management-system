import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';
import { CounterService } from '@/backend/counters/application/counterService';
import { VentaHistoricaService } from '@/backend/ventas/application/ventaHistorica.service';
import { PedidoHistoricoService} from '@/backend/pedidos/application/pedidoHistorico.service';

export async function getCounterByTypeRequestServer(name) {
  try {
    await connectDB();
    const counterService = new CounterService();

    const response = await counterService.getCurrentCounterByType(name);

    if (response?.status !== 200) {
      console.log('Error al obtener el contador de ' + name);
      return { contador: [], status: 500 };
    }
    const contador = response?.payload;
    return {
      contador: simplificadorParaClientComponent(contador),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

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