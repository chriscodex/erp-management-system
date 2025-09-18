import { fetchData, patchData, postData } from '@/lib/fetchData';
import {
  getCurrentCounterNotaVentaClientUrl,
  updateNotaVentaStateClientUrl,
  incrementCounterNotaVentaClientUrl,
  finalizarVentaClientUrl,
} from '@/lib/urls';
import { delay } from '@/lib/utils';

export async function getCurrentCounterNotaVentaRequestClient() {
  try {
    // Simular tiempo de retraso
    await delay();

    const url = `${getCurrentCounterNotaVentaClientUrl}?type=nota-venta`;

    // Hacer el fetch de los datos
    const response = await fetchData(url);

    if (response?.status === 500) {
      throw new Error(
        'No se pudo obtener el contador de boletas: ' + response?.data?.error,
      );
    }

    return response?.data?.payload;
  } catch (error) {
    console.error('Error en getCurrentCounterNotaVentaRequestClient:', error);
    throw error;
  }
}

export async function updateNotaVentaStateRequestClient(ventaId) {
  try {
    await delay();

    const urlUpdateStateNotaVenta = `${updateNotaVentaStateClientUrl}/${ventaId}`;

    const responseUpdateStateNotaVenta = await patchData(
      urlUpdateStateNotaVenta,
      {
        comprobante: 'Nota de Venta Impresa',
      },
    );

    const urlIncrementCounterNotaVenta = `${incrementCounterNotaVentaClientUrl}`;

    const responseIncrementCounterNotaVenta = await patchData(
      urlIncrementCounterNotaVenta,
      {
        type: 'nota-venta',
      },
    );

    if (responseUpdateStateNotaVenta?.status !== 200) {
      throw new Error(
        'No se pudo actualizar el estado de la nota de venta: ' +
          responseUpdateStateNotaVenta?.data?.error,
      );
    }

    if (responseIncrementCounterNotaVenta?.status !== 200) {
      throw new Error(
        'No se pudo incrementar el contador de notas de venta: ' +
          responseIncrementCounterNotaVenta?.data?.error,
      );
    }

    return responseUpdateStateNotaVenta?.data?.payload;
  } catch (error) {
    console.error('Error en updateNotaVentaStateRequestClient:', error);
    throw error;
  }
}

export async function finalizarNotaVentaRequestClient(ventaId) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      // Simular tiempo de retraso
      await delay();

      const urlUpdateStateNotaVenta = `${updateNotaVentaStateClientUrl}/${ventaId}`;

      const responseUpdateStateNotaVenta = await patchData(
        urlUpdateStateNotaVenta,
        {
          comprobante: 'Nota de Venta Impresa',
        },
      );

      if (responseUpdateStateNotaVenta?.status !== 200) {
        throw new Error(
          'No se pudo actualizar el estado de la nota de venta: ' +
            responseUpdateStateNotaVenta?.data?.error,
        );
      }

      const url = `${finalizarVentaClientUrl}/${ventaId}/finalizar`;

      // Obtener los datos de la persona
      const response = await postData(url);
      if (response?.status !== 201) {
        reject(
          'No se pudo eliminar la venta: ' + response.response?.data?.error,
        );
        return;
      }

      resolve(response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}
