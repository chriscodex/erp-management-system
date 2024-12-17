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

export async function createGastoMotoController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { motoId } = params;
    const body = await request.json();

    await connectDB();

    const gastoCreated = await motoService.createGasto(body, motoId);
    return gastoCreated;
  } catch (error) {
    console.error(
      'Moto Controller: Error interno al crear un gasto:',
      error.message
    );
    throw new Error('Moto Controller: Error interno al crear un gasto');
  }
}

export async function deleteGastoMotoController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { motoId, gastoId } = params;

    await connectDB();

    const deletedGasto = await motoService.deleteGasto(gastoId, motoId);
    return deletedGasto;
  } catch (error) {
    console.error(
      'Product Controller: Error interno al eliminar un gasto:',
      error.message
    );
    throw new Error('Product Controller: Error interno al eliminar un gasto');
  }
}

export async function updateGastoMotoController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { motoId, gastoId } = params;
    const body = await request.json();

    await connectDB();

    const result = await motoService.updateGasto(gastoId, motoId, body);
    return result;
  } catch (error) {
    console.error(
      'Product Controller: Error interno actualizando el gasto:',
      error.message
    );
    throw new Error('Product Controller: Error interno actualizando el gasto');
  }
}
