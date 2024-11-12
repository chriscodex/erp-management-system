import { AlmacenService } from '@/backend/almacenes/application/almacen.service.js';
import { connectDB } from '@/db/mongodb';

const almacenService = new AlmacenService();

export async function getAllAlmacenesController() {
  try {
    await connectDB();
    const almacenes = await almacenService.getAllAlmacenes();
    return almacenes;
  } catch (error) {
    console.error('Controller: Error fetching almacenes:', error);
    throw new Error(
      'Controller: Internal Server Error - getAllAlmacenesController'
    );
  }
}

export async function getAlmacenByDataController(almacenData) {
  try {
    await connectDB();
    const almacen = await almacenService.getAlmacenByData(almacenData);
    return almacen;
  } catch (error) {
    console.error('Controller: Error buscando el almacen:', error);
    throw new Error('Controller: Internal Server Error - getAlmacenController');
  }
}
