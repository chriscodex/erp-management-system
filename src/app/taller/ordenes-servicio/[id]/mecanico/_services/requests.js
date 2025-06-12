import { fetchData} from '@/lib/fetchData';
import {
  getProductByCodeClientUrl,
} from '@/lib/urls';
import { delay } from '@/lib/utils';

export function getProductByCodeClientRequest(code, setLoading) {
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

      //Para el error prevendido
      if (
        responseProduct?.status === 201 &&
        responseProduct?.data?.error?.message
      ) {
        setLoading(false);
        return reject(responseProduct.data.error.message);
      }

      setLoading(false);
      reject('No se ha encontrado un producto con ese código');

    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}