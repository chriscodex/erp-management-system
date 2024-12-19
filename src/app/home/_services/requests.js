import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';

import { MotoService } from '@/backend/motos/application/moto.service';

export async function getTotalMotosRequestServer() {
  try {
    await connectDB();
    const motoService = new MotoService();

    const response = await motoService.countAllMotos();
    if (response?.status !== 200) {
      console.log('Error al contar todas las motos');
      return { totalMotos: null, status: response?.status };
    }
    const motos = response?.payload;
    return {
      totalMotos: simplificadorParaClientComponent(motos),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}
