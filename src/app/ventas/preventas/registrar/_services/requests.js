import { fetchData } from '@/lib/fetchData';
import { getProductByIdClientUrl } from '@/lib/urls';
import { delay } from '@/lib/utils';

export function getProductByIdClientRequest(productId, setLoading) {
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso

      await delay();

      const response = await fetchData(
        `${getProductByIdClientUrl}/${productId}`
      );

      if (response?.status !== 200) {
        setLoading(false);
        reject('No se ha encontrado un producto con ese código');
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
