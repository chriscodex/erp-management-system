import { fetchData, patchData } from '@/lib/fetchData';
import {
  getCurrentCounterFacturaClientUrl,
  incrementCounterFacturaClientUrl,
  updateFacturaStateClientUrl,
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
        'No se pudo obtener el contador de facturas: ' + response?.data?.error
      );
    }

    return response?.data?.payload;
  } catch (error) {
    console.error('Error en getCurrentCounterFacturaRequestClient:', error);
    throw error; // Propagar el error para que el caller lo maneje
  }
}

export async function updateFacturaStateRequestClient(ventaId, counterFactura, selectedEmpresa) {
  try {
    await delay();

    const urlUpdateStateFactura = `${updateFacturaStateClientUrl}/${ventaId}`;
    
    const responseUpdateStateFactura = await patchData(urlUpdateStateFactura, {
      comprobante: 'Factura Impresa',
      counter: counterFactura,
      empresa: {
        ...selectedEmpresa
      },
    });

    const urlIncrementCounterFactura = `${incrementCounterFacturaClientUrl}`;

    const responseIncrementCounterFactura = await patchData(
      urlIncrementCounterFactura,
      {
        type: 'facturas',
      }
    );

    if (responseUpdateStateFactura?.status !== 200) {
      throw new Error(
        'No se pudo actualizar el estado de la factura: ' +
          responseUpdateStateFactura?.data?.error
      );
    }

    if (responseIncrementCounterFactura?.status !== 200) {
      throw new Error(
        'No se pudo incrementar el contador de facturas: ' +
          responseIncrementCounterFactura?.data?.error
      );
    }
  } catch (error) {
    console.error('Error en updateFacturaStateRequestClient:', error);
    throw error;
  }
}
