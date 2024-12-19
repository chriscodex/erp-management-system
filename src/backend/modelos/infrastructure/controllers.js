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

export async function deleteModeloController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { modeloId } = params;

    await connectDB();

    const deletedModelo = await modeloService.deleteModelo(modeloId);

    return deletedModelo;
  } catch (error) {
    console.error(
      'Modelo Controller: Error interno al eliminar un modelo:',
      error.message
    );
    throw new Error('Modelo Controller: Error interno al eliminar un modelo');
  }
}

export async function updateModeloController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { modeloId } = params;
    const body = await request.json();

    await connectDB();

    const updatedModelo = await modeloService.updateModelo(modeloId, body);
    return updatedModelo;
  } catch (error) {
    console.error(
      'Modelo Controller: Error interno al actualizar el modelo:',
      error.message
    );
    throw new Error('Modelo Controller: Error interno al actualizar el modelo');
  }
}
