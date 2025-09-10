import { patchData } from '@/lib/fetchData';
import { updateProductClientUrl } from '@/lib/urls';
import { delay } from '@/lib/utils';

export async function updateProductRequestClient(
  productId,
  productData,
  setLoading,
) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const updateCategoryUrl = `${updateProductClientUrl}/${productId}`;

      // Obtener los datos de la persona
      const response = await patchData(updateCategoryUrl, {
        ...productData,
        type: 'update',
      });
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar el producto: ' +
            response.response?.data?.error,
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
