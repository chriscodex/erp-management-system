import { patchData } from '@/lib/fetchData';
import { updateModeloClientUrl } from '@/lib/urls';
import { delay } from '@/lib/utils';

export async function updateModeloRequestClient(modeloId, modelo, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const updateCategoryUrl = `${updateModeloClientUrl}/${modeloId}`;

      // Obtener los datos de la persona
      const response = await patchData(updateCategoryUrl, modelo);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar el modelo: ' + response.response?.data?.error
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
