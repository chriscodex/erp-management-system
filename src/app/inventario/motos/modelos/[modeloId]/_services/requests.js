import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';

import { ModeloService } from '@/backend/modelos/application/modelo.service';
import { MotoService } from '@/backend/motos/application/moto.service';

export async function getModeloByIdRequestServer(modelId) {
  try {
    await connectDB();
    const modeloService = new ModeloService();

    const response = await modeloService.getModeloByData({ modelId });

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

export async function getAllMotosByModeloIdRequestServer(modeloId) {
  try {
    await connectDB();
    const motoService = new MotoService();

    const response = await motoService.getAllMotosByData({ modeloId });

    if (response?.status !== 200) {
      console.log('Error al obtener las motos por modelo desde el cliente');
      return { motosByModeloId: [], status: 500 };
    }
    const motosByModeloId = response?.payload;
    return {
      motosByModeloId: simplificadorParaClientComponent(motosByModeloId),
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}
