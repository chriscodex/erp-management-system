import { connectDB } from '@/db/mongodb';
import { MotoService } from '@/backend/motos/application/moto.service';
import { simplificadorParaClientComponent } from '@/lib/utils';

export async function getMotoByIdRequestServer(id) {
  try {
    await connectDB();
    const motoService = new MotoService();

    const response = await motoService.getMotoByData({ id });

    if (response?.status !== 200) {
      console.log('Error al obtener el producto desde el cliente');
      return { moto: null, status: 500 };
    }
    const moto = response?.payload;
    return { moto: simplificadorParaClientComponent(moto), status: 200 };
  } catch (error) {
    console.log(error);
  }
}
