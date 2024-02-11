import { connectDB } from '@/db/mongodb';
import { AlmacenService } from '@/backend/almacenes/application/almacen.service';

export async function getAllAlmacenesRequest() {
  try {
    await connectDB();
    const almacenService = new AlmacenService();

    const response = await almacenService.getAllAlmacenes();
    if (response?.status !== 200) {
      console.log('Error al obtener todos los almacenes');
      return { almacenes: [], status: 500 };
    }
    const almacenes = response?.payload;
    return { almacenes, status: 200 };
  } catch (error) {
    console.error(error);
  }
}
