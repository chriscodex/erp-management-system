import { fetchData } from '@/lib/fetchData';
import { getMotoByCodeClientUrl, getProductByCodeClientUrl } from '@/lib/urls';
import { delay } from '@/lib/utils';

export function getProductByIdClientRequest(code, setLoading) {
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso

      await delay();

      const responseProduct = await fetchData(
        `${getProductByCodeClientUrl}/?unit-code=${code}`
      );

      if (responseProduct?.status === 200 && responseProduct?.data?.payload) {
        setLoading(false);
        resolve(responseProduct?.data?.payload);
        return;
      }

      const responseMoto = await fetchData(
        `${getMotoByCodeClientUrl}/?code=${code}`
      );

      if (responseMoto?.status === 200 && responseMoto?.data?.payload) {
        setLoading(false);
        resolve(responseMoto?.data?.payload);
        return;
      }

      setLoading(false);
      reject('No se ha encontrado un producto o moto con ese código');
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}
