import { patchData, postData } from '@/lib/fetchData';
import { updatePedidoClientUrl, inventariarPedidoClientUrl } from '@/lib/urls';
import { delay } from '@/lib/utils';

export async function updatePedidoRequestClient(pedidoData, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const updatePedidoUrl = `${updatePedidoClientUrl}/${pedidoData?._id}`;

      const response = await patchData(updatePedidoUrl, pedidoData);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar el pedido: ' + response.response?.data?.error
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

export async function inventariarPedidoRequestClient(pedidoId) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const inventariarPedidoUrl = `${inventariarPedidoClientUrl}/${pedidoId}`;

      const response = await postData(inventariarPedidoUrl, { id: pedidoId });
      if (response?.status !== 201) {
        reject('No se pudo inventariar el pedido: ' + response.response?.data?.error);
        return;
      }
      resolve(response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}

