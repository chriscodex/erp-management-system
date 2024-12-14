import { ModeloService } from '@/backend/modelos/application/modelo.service';
import { connectDB } from '@/db/mongodb';
import { deleteData } from '@/lib/fetchData';
import { deleteModeloClientUrl } from '@/lib/urls';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

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

export async function deleteModeloRequestClient(modeloId) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteModeloClientUrl}/${modeloId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar el modelo: ' + response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}
