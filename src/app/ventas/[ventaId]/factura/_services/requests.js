import { fetchData, patchData } from '@/lib/fetchData';
import {
  getCurrentCounterFacturaClientUrl,
  incrementCounterFacturaClientUrl,
  updateFacturaStateClientUrl,
  updateVentaClientUrl,
} from '@/lib/urls';
import { delay } from '@/lib/utils';

export async function getCurrentCounterFacturaRequestClient() {
  try {
    // Simular tiempo de retraso
    await delay();

    const url = `${getCurrentCounterFacturaClientUrl}?type=facturas`;

    // Hacer el fetch de los datos
    const response = await fetchData(url);

    if (response?.status === 500) {
      throw new Error(
        'No se pudo obtener el contador de facturas: ' + response?.data?.error,
      );
    }

    return response?.data?.payload;
  } catch (error) {
    console.error('Error en getCurrentCounterFacturaRequestClient:', error);
    throw error; // Propagar el error para que el caller lo maneje
  }
}

/**
 * Actualiza el estado de la factura y env a Sunat.
 * @param {number} ventaId - El id de la venta que se va a imprimir.
 * @param {number} counterFactura - El valor actual del contador de facturas.
 * @param {object} selectedEmpresa - La empresa seleccionada.
 * @return {Promise<object>} Resuelve con el payload de la respuesta.
 * @throws {Error} Si no se pudo enviar la factura a Sunat o actualizar el estado de la factura.
 */
export async function updateFacturaStateRequestClient(
  ventaId,
  counterFactura,
  selectedEmpresa,
) {
  try {
    await delay();

    // Paso 1: Enviar la factura a Sunat
    const urlEnviarFactura = `${updateFacturaStateClientUrl}/${ventaId}/enviar-factura`;
    const responseEnviarFactura = await patchData(urlEnviarFactura, {
      empresa: {
        ...selectedEmpresa,
      },
    });

    if (
      responseEnviarFactura?.status !== 200 ||
      !responseEnviarFactura?.data?.payload?.success
    ) {
      throw new Error(
        'No se pudo enviar la factura a Sunat: ' +
          responseEnviarFactura?.data?.payload?.estadoSunat ||
          responseEnviarFactura?.data?.error,
      );
    }

    // Paso 2: Actualizar el estado de la factura e incrementar el contador
    const urlUpdateStateFactura = `${updateFacturaStateClientUrl}/${ventaId}`;
    const responseUpdateStateFactura = await patchData(urlUpdateStateFactura, {
      comprobante: 'Factura Impresa',
      counter: counterFactura,
      empresa: {
        ...selectedEmpresa,
      },
    });

    const urlIncrementCounterFactura = `${incrementCounterFacturaClientUrl}`;
    const responseIncrementCounterFactura = await patchData(
      urlIncrementCounterFactura,
      {
        type: 'facturas',
      },
    );

    if (responseUpdateStateFactura?.status !== 200) {
      throw new Error(
        'No se pudo actualizar el estado de la factura: ' +
          responseUpdateStateFactura?.data?.error,
      );
    }

    if (responseIncrementCounterFactura?.status !== 200) {
      throw new Error(
        'No se pudo incrementar el contador de facturas: ' +
          responseIncrementCounterFactura?.data?.error,
      );
    }

    return responseUpdateStateFactura?.data?.payload;
  } catch (error) {
    console.error('Error en updateFacturaStateRequestClient:', error);
    throw error;
  }
}

export async function updateVentaRequestClient(ventaId, ventaData, setLoading) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);

      const updateVentaUrl = `${updateVentaClientUrl}/${ventaId}`;

      const response = await patchData(updateVentaUrl, ventaData);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar la venta: ' + response.response?.data?.error,
        );
        return;
      }

      setLoading(false);
      resolve(response?.data?.payload);
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}
