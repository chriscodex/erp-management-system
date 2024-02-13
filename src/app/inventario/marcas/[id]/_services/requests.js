import {  patchData } from '@/lib/fetchData';
import { updateMarcaClientUrl } from '@/lib/urls';
import { delay } from '@/lib/utils';

import { connectDB } from '@/db/mongodb';
import { MarcaService } from '@/backend/marcas/application/marca.service';

export async function getMarcaRequest(id) {
  try {
    await connectDB();
    const marcaService = new MarcaService();

    const response = await marcaService.getMarcaByData({ id });

    if (response?.status !== 200) {
      console.log('Error al obtener el usuario desde el cliente');
      return { marca: null, status: 500 };
    }
    const marca = response?.payload;
    return { marca, status: 200 };
  } catch (error) {
    console.log(error);
  }
}

export async function updateMarcaRequest(id, marca, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const url = `${updateMarcaClientUrl}/${id}`;

      // Obtener los datos de la persona
      const response = await patchData(url, marca);
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
