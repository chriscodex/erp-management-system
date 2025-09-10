import { ClienteService } from '@/backend/clientes/application/cliente.service';
import { VentaHistoricaService } from '@/backend/ventas/application/ventaHistorica.service';
import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';

export async function getClienteRequestServer(clienteId) {
  try {
    await connectDB();
    const clienteService = new ClienteService();

    const response = await clienteService.getClienteByData({
      id: clienteId,
    });

    if (response?.status !== 200) {
      console.log('Error al obtener el cliente desde el servidor');
      return { cliente: null, status: response?.status };
    }
    const cliente = response?.payload;
    return {
      cliente: simplificadorParaClientComponent(cliente),
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getVentasHistoricasRequestServer(clienteId) {
  try {
    await connectDB();
    const ventasHistoricasService = new VentaHistoricaService();

    const response =
      await ventasHistoricasService.getVentasHistoricasByCliente(clienteId);

    if (response?.status !== 200) {
      console.log('Error al obtener las ventas históricas del cliente');
      return { ventasHistoricas: [], status: response?.status };
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
