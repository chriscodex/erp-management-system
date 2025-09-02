import { AlmacenService } from '@/backend/almacenes/application/almacen.service.js';
import { connectDB } from '@/db/mongodb';

const almacenService = new AlmacenService();

export async function getAllAlmacenesController() {
  try {
    await connectDB();

    const almacenes = await almacenService.getAllAlmacenes();

    return almacenes;
  } catch (error) {
    console.error(
      'Almacen Controller: Error interno al obtener el almacen:',
      error.message,
    );
    throw new Error('Almacen Controller: Error interno al obtener el almacen');
  }
}

export async function getAlmacenController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;

    await connectDB();

    const almacen = await almacenService.getAlmacenByData({ id });
    return almacen;
  } catch (error) {
    console.error(
      'Almacen Controller: Error interno al obtener el almacen:',
      error.message,
    );
    throw new Error('Almacen Controller: Error interno al obtener el almacen');
  }
}

export async function createAlmacenController(request) {
  try {
    const body = await request.json();

    await connectDB();

    const almacenCreated = await almacenService.createAlmacen(body);
    return almacenCreated;
  } catch (error) {
    console.error(
      'Almacen Controller: Error interno al crear el almacen:',
      error.message,
    );
    throw new Error('Almacen Controller: Error interno al crear el almacen');
  }
}

export async function updateAlmacenController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;
    const body = await request.json();

    await connectDB();

    const updatedAlmacen = await almacenService.updateAlmacen(id, body);
    return updatedAlmacen;
  } catch (error) {
    console.error(
      'Almacen Controller: Error interno al actualizar el almacén:',
      error.message,
    );
    throw new Error(
      'Almacen Controller: Error interno al actualizar el almacén',
    );
  }
}

export async function deleteAlmacenController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;

    await connectDB();

    const deletedAlmacen = await almacenService.deleteAlmacen(id);

    return deletedAlmacen;
  } catch (error) {
    console.error(
      'Delete Almacen: Error interno al eliminar el almacén:',
      error.message,
    );
    throw new Error('Delete Almacen: Error interno al eliminar el almacén');
  }
}
