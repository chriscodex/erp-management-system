import { fetchData, patchData, postData } from '@/lib/fetchData';
import {
  getCurrentCounterBoletaClientUrl,
  incrementCounterBoletaClientUrl,
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

/**
 * Actualiza el estado de la boleta y envía la boleta a Sunat.
 * 
 * @param {number} ventaId - El id de la venta para la cual se va a realizar la actualización.
 * @param {number} counterBoleta - El valor actual del contador de boletas.
 * @param {object} selectedEmpresa - La empresa seleccionada para el envío de la boleta.
 * @throws {Error} Si no se pudo enviar la boleta a Sunat o actualizar el estado de la boleta.
 */

export async function updateBoletaStateRequestClient(
  ventaId,
  counterBoleta,
  selectedEmpresa
) {
  try {
    await delay();

    const urlEnviarBoleta = `${updateBoletaStateClientUrl}/${ventaId}/enviar-boleta`;
    const responseEnviarBoleta = await postData(urlEnviarBoleta, {
      empresa: {
        ...selectedEmpresa,
      },
    });

    if (
      responseEnviarBoleta?.status !== 200 ||
      !responseEnviarBoleta?.data?.payload?.success
    ) {
      throw new Error(
        'No se pudo enviar la boleta a Sunat: ' +
          responseEnviarBoleta?.data?.payload?.estadoSunat ||
          responseEnviarBoleta?.data?.error
      );
    }

    // Paso: Actualización del estado de la boleta e incremento del contador
    const urlUpdateStateBoleta = `${updateBoletaStateClientUrl}/${ventaId}`;
    const responseUpdateStateBoleta = await patchData(urlUpdateStateBoleta, {
      comprobante: 'Boleta Impresa',
      counter: counterBoleta,
      empresa: {
        ...selectedEmpresa,
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
