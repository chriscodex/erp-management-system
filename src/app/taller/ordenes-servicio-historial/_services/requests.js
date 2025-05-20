import { OrdenServicioHistoricaService } from '@/backend/ordenesServicio/application/ordenServicioHistorica.service';
import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';

export async function getOrdenDeServicioHistoricaRequestServer(ordenDeServicioHistoricaId) {
  try {
    await connectDB();
    const ordenDeServicioHistoricaService = new OrdenServicioHistoricaService();

    const response = await ordenDeServicioHistoricaService.getOrdenDeServicioHistoricaByData({
      id: ordenDeServicioHistoricaId,
    });

    if (response?.status !== 200) {
      console.log('Error al obtener la orden de servicio historica desde el servidor');
      return { ordenDeServicioHistorica: null, status: response?.status };
    }
    const ordenDeServicioHistorica = response?.payload;
    return {
      ordenDeServicioHistorica: simplificadorParaClientComponent(ordenDeServicioHistorica),
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getAllOrdenesDeServicioHistoricasRequestServer() {
  try {
    await connectDB();
    const ordenDeServicioHistoricaService = new OrdenServicioHistoricaService();

    const response = await ordenDeServicioHistoricaService.getAllOrdenesDeServicioHistoricas();

    if (response?.status !== 200) {
      console.log('Error al obtener todas las ordenes de servicio historicas');
      return { ordenesDeServicioHistoricas: [], status: 500 };
    }
    const ordenesDeServicioHistoricas = response?.payload;

    return {
      ordenesDeServicioHistoricas: simplificadorParaClientComponent(ordenesDeServicioHistoricas),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}
