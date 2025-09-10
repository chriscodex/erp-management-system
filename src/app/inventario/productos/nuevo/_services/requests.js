import { createProductClientUrl } from '@/lib/urls';
import { postData } from '@/lib/fetchData';
import { delay } from '@/lib/utils';

export async function createProductRequestClient(product, setLoading) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso para pruebas en la UI
      await delay();

      // Obtener los datos del producto
      const response = await postData(createProductClientUrl, product);
      if (response?.status !== 201) {
        setLoading(false);
        reject(
          'No se pudo crear el producto: ' + response.response?.data?.error,
        );
        return;
      }

      setLoading(false);
      resolve(response?.data?.payload);
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}
