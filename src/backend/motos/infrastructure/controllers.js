import { MotoService } from '@/backend/motos/application/moto.service';
import { connectDB } from '@/db/mongodb';

const motoService = new MotoService();

export async function getMotoByDataController(request) {
  try {
    // Extrae los query parameters de la URL
    const { searchParams } = new URL(request.url);
    const motoCode = searchParams.get('code');

    await connectDB();

    if (motoCode !== null) {
      const product = await motoService.getMotoByData({
        code: motoCode,
        'estado.titulo': {
          $in: ['disponible', 'reparado', 'dañado', 'desarmado'],
        },
      });
      return product;
    }
    const motos = await motoService.getAllMotos();
    return motos;
  } catch (error) {
    console.error(
      'Moto Controller: Error interno al obtener las motos:',
      error.message,
    );
    throw new Error('Moto Controller: Error interno al obtener las motos');
  }
}

export async function createMotoController(request) {
  try {
    const body = await request.json();

    await connectDB();

    const motoCreated = await motoService.createMoto(body);
    return motoCreated;
  } catch (error) {
    console.error(
      'Moto Controller: Error interno al crear la moto:',
      error.message,
    );
    throw new Error('Moto Controller: Error interno al crear la moto');
  }
}

export async function updateMotoController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { motoId } = params;
    const body = await request.json();

    await connectDB();
    const updatedMoto = await motoService.updateMoto(motoId, body);
    return updatedMoto;
  } catch (error) {
    console.error(
      'Moto Controller: Error interno actualizando la moto:',
      error.message,
    );
    throw new Error('Moto Controller: Error interno actualizando la moto');
  }
}

export async function deleteMotoController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { motoId } = params;

    await connectDB();

    const deletedMoto = await motoService.deleteMoto(motoId);

    return deletedMoto;
  } catch (error) {
    console.error(
      'Moto Controller: Error interno al eliminar una moto:',
      error.message,
    );
    throw new Error('Moto Controller: Error interno al eliminar una moto');
  }
}

export async function createGastoMotoController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { motoId } = params;
    const body = await request.json();

    await connectDB();

    const gastoCreated = await motoService.createGastoMoto(body, motoId);
    return gastoCreated;
  } catch (error) {
    console.error(
      'Moto Controller: Error interno al crear un gasto:',
      error.message,
    );
    throw new Error('Moto Controller: Error interno al crear un gasto');
  }
}

export async function deleteGastoMotoController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { motoId, gastoId } = params;

    await connectDB();

    const deletedGasto = await motoService.deleteGastoMoto(gastoId, motoId);
    return deletedGasto;
  } catch (error) {
    console.error(
      'Moto Controller: Error interno al eliminar un gasto:',
      error.message,
    );
    throw new Error('Moto Controller: Error interno al eliminar un gasto');
  }
}

export async function updateGastoMotoController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { motoId, gastoId } = params;
    const body = await request.json();

    await connectDB();

    const result = await motoService.updateGastoMoto(gastoId, motoId, body);
    return result;
  } catch (error) {
    console.error(
      'Moto Controller: Error interno actualizando el gasto:',
      error.message,
    );
    throw new Error('Moto Controller: Error interno actualizando el gasto');
  }
}
