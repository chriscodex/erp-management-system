import { connectDB } from '@/db/mongodb';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

import { PreventaService } from '@/backend/preventas/application/preventa.service';
import { deletePreventaClientUrl } from '@/lib/urls';
import { deleteData } from '@/lib/fetchData';

export async function getPreventaRequestServer(preventaId) {
  try {
    await connectDB();
    const preventaService = new PreventaService();

    const response = await preventaService.getPreventaByData({
      id: preventaId,
    });

    if (response?.status !== 200) {
      console.log('Error al obtener la preventa desde el servidor');
      return { preventa: null, status: response?.status };
    }
    const preventa = response?.payload;
    return {
      preventa: simplificadorParaClientComponent(preventa),
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function deletePreventaRequestClient(preventaId) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deletePreventaClientUrl}/${preventaId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar la preventa: ' + response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}
