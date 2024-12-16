import { MotoService } from '@/backend/motos/application/moto.service';
import { connectDB } from '@/db/mongodb';

const motoService = new MotoService();

export async function createMotoController(request) {
  try {
    const body = await request.json();

    await connectDB();

    const motoCreated = await motoService.createMoto(body);
    return motoCreated;
  } catch (error) {
    console.error(
      'Moto Controller: Error interno al crear la moto:',
      error.message
    );
    throw new Error('Moto Controller: Error interno al crear la moto');
  }
}
