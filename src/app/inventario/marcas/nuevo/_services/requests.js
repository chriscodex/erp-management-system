import { postData } from '@/lib/fetchData';
import { createMarcaClientUrl } from '@/lib/urls';
import { delay } from '@/lib/utils';

export async function createMarcaRequest(marca, setLoading, setError) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      // Obtener los datos de la persona
      const response = await postData(createMarcaClientUrl, marca);
      if (response?.status === 409) {
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
