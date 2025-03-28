import { PreventaService } from '@/backend/preventas/application/preventa.service';
import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';

export async function getPreventaRequestServer(ventaId) {
  try {
    await connectDB();
    const prventaService = new PreventaService();

    const response = await prventaService.getPreventaByData({
      id: ventaId,
    });

    if (response?.status !== 200) {
      console.log('Error al obtener la venta desde el servidor');
      return { preventa: null, status: response?.status };
    }
    const preventa = response?.payload;
    return {
      preventa: simplificadorParaClientComponent(preventa),
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getAllPreventasRequestServer() {
  try {
    await connectDB();
    const preventaService = new PreventaService();

    const response = await preventaService.getAllPreventas();

    if (response?.status !== 200) {
      console.log('Error al obtener todas las preventas');
      return { preventas: [], status: 500 };
    }
    const preventas = response?.payload;

    return {
      preventas: simplificadorParaClientComponent(preventas),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}
