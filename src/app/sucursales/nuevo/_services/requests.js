import { postData } from '@/lib/fetchData';
import { createSucursalClientUrl } from '@/lib/urls';
import { delay } from '@/lib/utils';



export async function createSucursalRequestClient(sucursal, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      // Obtener los datos de la sucursal
      const response = await postData(createSucursalClientUrl, sucursal);
      
      if (response?.status !== 201) {
        setLoading(false);
        reject('No se pudo crear la sucursal: ' + response.response?.data?.error);
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
