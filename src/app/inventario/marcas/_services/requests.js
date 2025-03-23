import { deleteMarcaClientUrl } from '@/lib/urls';
import { deleteData } from '@/lib/fetchData';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

import { connectDB } from '@/db/mongodb';
import { MarcaService } from '@/backend/marcas/application/marca.service';

export async function getAllMarcasRequestServer() {
  try {
    await connectDB();
    const marcaService = new MarcaService();

    const response = await marcaService.getAllMarcas();

    if (response?.status !== 200) {
      console.log('Error al obtener todas las marcas');
      return { marcas: [], status: 500 };
    }
    const marcas = response?.payload;

    return { marcas: simplificadorParaClientComponent(marcas), status: 200 };
  } catch (error) {
    console.error(error);
  }
}

export async function deleteMarcaRequestClient(marcaId) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteMarcaClientUrl}/${marcaId}`;

      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar la categoría: ' + response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}
