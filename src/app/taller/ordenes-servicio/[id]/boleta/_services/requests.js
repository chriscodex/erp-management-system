import { fetchData, patchData } from '@/lib/fetchData';
import {
  getCurrentCounterBoletaClientUrl,
  incrementCounterBoletaClientUrl,
  updateBoletaOrdenDeServicioStateClientUrl,
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

export async function updateBoletaStateRequestClient(ordenDeServicioId, counterBoleta, selectedEmpresa) {
  try {
    await delay();

    const urlUpdateStateBoleta = `${updateBoletaOrdenDeServicioStateClientUrl}/${ordenDeServicioId}`;

    const responseUpdateStateBoleta = await patchData(urlUpdateStateBoleta, {
      comprobante: 'Boleta Impresa',
      counter: counterBoleta,
      empresa: {
        ...selectedEmpresa
      },
    });

    const urlIncrementCounterBoleta = `${incrementCounterBoletaClientUrl}`;

    const responseIncrementCounterBoleta = await patchData(
      urlIncrementCounterBoleta,
      {
        type: 'boletas',
      }
    );

    if (responseUpdateStateBoleta?.status !== 200) {
      throw new Error(
        'No se pudo actualizar el estado de la boleta: ' +
          responseUpdateStateBoleta?.data?.error
      );
    }

    if (responseIncrementCounterBoleta?.status !== 200) {
      throw new Error(
        'No se pudo incrementar el contador de boletas: ' +
          responseIncrementCounterBoleta?.data?.error
      );
    }
  } catch (error) {
    console.error('Error en updateBoletaStateRequestClient:', error);
    throw error;
  }
}
