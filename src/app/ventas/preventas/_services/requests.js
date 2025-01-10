import { PreventaService } from '@/backend/preventas/application/preventa.service';
import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';

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
