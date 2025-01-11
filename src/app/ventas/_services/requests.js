import { PreventaService } from '@/backend/preventas/application/preventa.service';
import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';

export async function getPreventaRequestServer(preventaId) {
  try {
    await connectDB();
    const preventaService = new PreventaService();

    const response = await preventaService.getPreventaByData({
      id: preventaId,
    });

    if (response?.status !== 200) {
      console.log('Error al obtener la preventa desde el servidor');
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
