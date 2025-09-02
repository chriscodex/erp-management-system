import { fetchData, patchData } from '@/lib/fetchData';
import {
  getCurrentCounterNotaVentaClientUrl,
  updateNotaVentaStateClientUrl,
  incrementCounterNotaVentaClientUrl,
} from '@/lib/urls';
import { delay } from '@/lib/utils';

export async function getCurrentCounterNotaDeVentaRequestClient() {
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

export async function updateNotaDeVentaStateRequestClient(ordenDeServicioId) {
  try {
    await delay();

    const urlUpdateStateNotaVenta = `${updateNotaVentaStateClientUrl}/${ordenDeServicioId}`;

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
