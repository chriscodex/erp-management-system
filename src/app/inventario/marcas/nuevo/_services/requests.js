import { postData } from '@/lib/fetchData';
import { createMarcaUrl } from '@/lib/urls';

/* eslint-disable */
export async function createMarcaRequest(marca, setLoading) {
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Obtener los datos de la persona
      const response = await postData(createMarcaUrl, marca);
      if (response?.status !== 201) {
        setLoading(false);
        reject(
          'No se pudo crear la marca: ' + response.response?.data?.error
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
/* eslint-enable */