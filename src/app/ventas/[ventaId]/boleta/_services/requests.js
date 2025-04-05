import { fetchData, patchData } from '@/lib/fetchData';
import {
  getCurrentCounterBoletaClientUrl,
  updateBoletaStateClientUrl,
} from '@/lib/urls';
import { delay } from '@/lib/utils';

export async function getCurrentCounterBoletaRequestClient() {
  try {
    // Simular tiempo de retraso
    await delay();

    const url = `${getCurrentCounterBoletaClientUrl}?type=boletas`;

    // Hacer el fetch de los datos
    const response = await fetchData(url);

    if (response?.status === 500) {
      throw new Error(
        'No se pudo obtener el contador de boletas: ' + response?.data?.error
      );
    }

    return response?.data?.payload;
  } catch (error) {
    console.error('Error en getCurrentCounterBoletaRequestClient:', error);
    throw error; // Propagar el error para que el caller lo maneje
  }
}

export async function updateBoletaStateRequestClient(ventaId) {
  try {
    await delay();

    const url = `${updateBoletaStateClientUrl}/${ventaId}`;

    const response = await patchData(url, { estado: 'Impreso' });

    if (response?.status !== 200) {
      throw new Error(
        'No se pudo actualizar el estado de la boleta: ' + response?.data?.error
      );
    }

    return response?.data?.payload;
  } catch (error) {
    console.error('Error en updateBoletaStateRequestClient:', error);
    throw error;
  }
}
