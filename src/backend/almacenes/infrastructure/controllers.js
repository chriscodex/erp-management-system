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
      error.message
    );
    throw new Error('Almacen Controller: Error interno al obtener el almacen');
  }
}

export async function getAlmacenController(routeContext) {
  try {
    const { params } = routeContext;
    const { id } = params;

    await connectDB();

    const almacen = await almacenService.getAlmacenByData({ id });
    return almacen;
  } catch (error) {
    console.error(
      'Almacen Controller: Error interno al obtener el almacen:',
      error.message
    );
    throw new Error('Almacen Controller: Error interno al obtener el almacen');
  }
}
