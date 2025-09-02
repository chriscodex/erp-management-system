import { postData } from '@/lib/fetchData';
import { createMarcaClientUrl } from '@/lib/urls';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

import { connectDB } from '@/db/mongodb';
import { SegmentService } from '@/backend/segments/application/segments.service';

export async function getAllSegmentsRequestServer() {
  try {
    await connectDB();
    const segmentService = new SegmentService();

    const response = await segmentService.getAllSegments();

    if (response?.status !== 200) {
      console.log('Error al obtener todos los segmentos');
      return { categories: [], status: response?.status };
    }
    const segments = response?.payload;
    return {
      segments: simplificadorParaClientComponent(segments),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function createMarcaRequestClient(marca, setLoading, setError) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      // Obtener los datos de la persona
      const response = await postData(createMarcaClientUrl, marca);
      if (response?.status === 201) {
        setLoading(false);
        setError('nombre', {
          type: 'custom',
          message:
            'Una marca con el mismo nombre ya existe en el segmento seleccionado',
        });
        reject('No se pudo crear la marca: ' + response.response?.data?.error);
        return;
      }
      if (response?.status !== 201) {
        setLoading(false);
        reject('No se pudo crear la marca: ' + response.response?.data?.error);
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
