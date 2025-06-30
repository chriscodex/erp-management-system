import { VentaHistoricaService } from '@/backend/ventas/application/ventaHistorica.service';
import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';

export async function getVentaHistoricaRequestServer(ventaHistoricaId) {
  try {
    await connectDB();
    const ventaHistoricaService = new VentaHistoricaService();

    const response = await ventaHistoricaService.getVentaHistoricaByData({
      id: ventaHistoricaId,
    });

    if (response?.status !== 200) {
      console.log('Error al obtener la venta historica desde el servidor');
      return { ventaHistorica: null, status: response?.status };
    }
    const ventaHistorica = response?.payload;
    return {
      ventaHistorica: simplificadorParaClientComponent(ventaHistorica),
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getAllVentasHistoricasRequestServer() {
  try {
    await connectDB();
    const ventaHistoricaService = new VentaHistoricaService();

    const response = await ventaHistoricaService.getAllVentasHistoricas();

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
