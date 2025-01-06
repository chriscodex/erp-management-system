import { patchData } from '@/lib/fetchData';
import { updateMarcaClientUrl } from '@/lib/urls';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

import { connectDB } from '@/db/mongodb';
import { MarcaService } from '@/backend/marcas/application/marca.service';

export async function getMarcaRequestServer(id) {
  try {
    await connectDB();
    const marcaService = new MarcaService();

    const response = await marcaService.getMarcaByData({ id });

    if (response?.status !== 200) {
      console.log('Error al obtener la marca desde el servidor');
      return { marca: null, status: response?.status };
    }
    const marca = response?.payload;
    return { marca: simplificadorParaClientComponent(marca), status: 200 };
  } catch (error) {
    console.log(error);
  }
}

export async function updateMarcaRequestClient(marcaId, marcaData, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const updateMarcaUrl = `${updateMarcaClientUrl}/${marcaId}`;

      // Obtener los datos de la persona
      const response = await patchData(updateMarcaUrl, marcaData);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar la marca: ' + response.response?.data?.error
        );
        return;
      }

      setLoading(false);
      resolve(response?.response?.data?.payload);
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}
