import { ModeloService } from '@/backend/modelos/application/modelo.service';
import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';

export async function getAllModelosRequestServer() {
  try {
    await connectDB();
    const modeloService = new ModeloService();

    const response = await modeloService.getAllModelos();

    if (response?.status !== 200) {
      console.log('Error al obtener todos los modelos');
      return { modelos: [], status: 500 };
    }
    const modelos = response?.payload;
    return {
      modelos: simplificadorParaClientComponent(modelos),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}
