import { postData } from '@/lib/fetchData';
import { inventariarPedidoClientUrl } from '@/lib/urls';
import { delay } from '@/lib/utils';

export async function inventariarPedidoRequestClient(pedidoId) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      // Simular tiempo de retraso
      await delay();

      const inventariarPedidoUrl = `${inventariarPedidoClientUrl}/${pedidoId}`;

      const response = await postData(inventariarPedidoUrl, { id: pedidoId });
      if (response?.status !== 201) {
        reject(
          'No se pudo inventariar el pedido: ' + response.response?.data?.error,
        );
        return;
      }
      resolve(response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}
