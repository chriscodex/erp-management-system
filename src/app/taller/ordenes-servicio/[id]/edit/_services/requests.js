import { patchData } from '@/lib/fetchData';
import { updateOrdenDeServicioClientUrl } from '@/lib/urls';
import { delay } from '@/lib/utils';

export async function updateOrdenDeServicioRequestClient(
  ordenDeServicioData,
  setLoading,
) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const updateOrdenDeServicioUrl = `${updateOrdenDeServicioClientUrl}/${ordenDeServicioData?._id}`;

      // Obtener los datos de la orden de servicio
      const response = await patchData(
        updateOrdenDeServicioUrl,
        ordenDeServicioData,
      );
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar la orden de servicio: ' +
            response.response?.data?.error,
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
