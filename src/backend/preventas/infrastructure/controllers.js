import { connectDB } from '@/db/mongodb';
import { PreventaService } from '@/backend/preventas/application/preventa.service';

const preventaService = new PreventaService();

export async function createPreventaController(request) {
  try {
    const body = await request.json();

    await connectDB();

    const createdPreventa = await preventaService.createPreventa(body);
    return createdPreventa;
  } catch (error) {
    console.error(
      'Preventa Controller: Error interno al crear la preventa:',
      error.message
    );
    throw new Error('Preventa Controller: Error interno al crear la preventa');
  }
}
