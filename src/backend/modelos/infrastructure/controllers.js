import { ModeloService } from '@/backend/modelos/application/modelo.service';
import { connectDB } from '@/db/mongodb';

const modeloService = new ModeloService();

export async function createModeloController(request) {
  try {
    const body = await request.json();

    await connectDB();

    const modeloCreated = await modeloService.createModelo(body);
    return modeloCreated;
  } catch (error) {
    console.error(
      'Modelo Controller: Error interno al crear el modelo:',
      error.message
    );
    throw new Error('Modelo Controller: Error interno al crear el modelo');
  }
}
