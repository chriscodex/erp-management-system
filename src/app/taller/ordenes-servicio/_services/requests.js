import { OrdenServicioService } from '@/backend/ordenesServicio/application/ordenServicio.service';
import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';

export async function getOrdenDeServicioRequestServer(ordenDeServicioId) {
  try {
    await connectDB();
    const ordenDeServicioService = new OrdenServicioService();

    const response = await ordenDeServicioService.getOrdenDeServicioByData({
      id: ordenDeServicioId,
    });

    if (response?.status !== 200) {
      console.log('Error al obtener la orden de servicio desde el servidor');
      return { ordenDeServicio: null, status: response?.status };
    }
    const ordenDeServicio = response?.payload;
    return {
      ordenDeServicio: simplificadorParaClientComponent(ordenDeServicio),
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function getAllOrdenesDeServicioRequestServer() {
  try {
    await connectDB();
    const ordenDeServicioService = new OrdenServicioService();

    const response = await ordenDeServicioService.getAllOrdenesDeServicio();

    if (response?.status !== 200) {
      console.log('Error al obtener todas las órdenes de servicio');
      return { ventas: [], status: 500 };
    }
    const ordenesDeServicio = response?.payload;

    return {
      ordenesDeServicio: simplificadorParaClientComponent(ordenesDeServicio),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}
