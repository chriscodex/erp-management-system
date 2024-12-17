import { patchData, postData } from '@/lib/fetchData';
import { createGastoMotoClientUrl, updateGastoMotoClientUrl } from '@/lib/urls';
import { delay } from '@/lib/utils';

export async function addGastoMotoRequestClient(motoId, gastoData, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const url = `${createGastoMotoClientUrl}/${motoId}/gastos`;

      const gastoTest = {
        ...gastoData,
      };

      // Obtener los datos de la persona
      const response = await postData(url, gastoTest);
      if (response?.status !== 201) {
        setLoading(false);
        reject('No se pudo crear el gasto: ' + response.response?.data?.error);
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

export async function updateGastoMotoRequestClient(
  gastoId,
  motoId,
  motoData,
  setLoading
) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const updateCategoryUrl = `${updateGastoMotoClientUrl}/${motoId}/gastos/${gastoId}`;

      // Obtener los datos de la persona
      const response = await patchData(updateCategoryUrl, motoData);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar el gasto: ' + response.response?.data?.error
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
