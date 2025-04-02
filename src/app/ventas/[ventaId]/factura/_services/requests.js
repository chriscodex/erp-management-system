import { fetchData } from '@/lib/fetchData';
import { getCurrentCounterFacturaClientUrl } from '@/lib/urls';
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
