import { connectDB } from '@/db/mongodb';
import { AlmacenService } from '@/backend/almacenes/application/almacen.service';
import { simplificadorParaClientComponent } from '@/lib/utils';

export async function getAllAlmacenesRequestServer() {
  try {
    await connectDB();
    const almacenService = new AlmacenService();

    const response = await almacenService.getAllAlmacenes();
    if (response?.status !== 200) {
      console.log('Error al obtener todos los almacenes');
      return { almacenes: [], status: response?.status };
    }

    const almacenes = response?.payload;
    return {
      almacenes: simplificadorParaClientComponent(almacenes),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}
