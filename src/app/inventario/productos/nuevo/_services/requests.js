import { createProductClientUrl } from '@/lib/urls';
import { postData } from '@/lib/fetchData';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

import { connectDB } from '@/db/mongodb';
import { SegmentService } from '@/backend/segments/application/segments.service';

export async function getSegmentByDataRequestServer(segmentFilter) {
  try {
    await connectDB();
    const segmentService = new SegmentService();

    const response = await segmentService.getSegmentByData({
      nombre: segmentFilter,
    });

    if (response?.status !== 200) {
      console.log('Error al obtener el segmento filtrado');
      return { segment: null, status: response?.status };
    }
    const segment = response?.payload;
    return { segment: simplificadorParaClientComponent(segment), status: 200 };
  } catch (error) {
    console.error(error);
  }
}

export async function createProductRequestClient(product, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso para pruebas en la UI
      await delay();

      // Obtener los datos del producto
      const response = await postData(createProductClientUrl, product);
      if (response?.status !== 201) {
        setLoading(false);
        reject(
          'No se pudo crear el producto: ' + response.response?.data?.error
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
