import { ModeloService } from '@/backend/modelos/application/modelo.service';
import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';

export async function getModeloByIdRequestServer(id) {
  try {
    await connectDB();
    const modeloService = new ModeloService();

    const response = await modeloService.getModeloByData({ id });

    if (response?.status !== 200) {
      console.log('Error al obtener el modelo desde el cliente');
      return { modelo: null, status: 500 };
    }
    const modelo = response?.payload;
    return { modelo: simplificadorParaClientComponent(modelo), status: 200 };
  } catch (error) {
    console.log(error);
  }
}
