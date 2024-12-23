import { MotoService } from '@/backend/motos/application/moto.service';
import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';

export async function getAllMotosRequestServer() {
  try {
    await connectDB();
    const motoService = new MotoService();

    const response = await motoService.getAllMotos();

    if (response?.status !== 200) {
      console.log('Error al obtener todas las motos');
      return { motos: [], status: 500 };
    }

    const motos = response?.payload;

    return {
      motos: simplificadorParaClientComponent(motos),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}
