import {
  getMarcasBySegmenteIdServerUrl,
  getAllProveedoresServerUrl,
} from '@/lib/urls';
import { fetchData } from '@/lib/fetchData';

export async function getMarcasBySegmentDataRequest(segmentData) {
  try {
    const { segmentId, segmentName } = segmentData;
    let response;
    if (segmentName) {
      response = await fetchData(
        `${getMarcasBySegmenteIdServerUrl}/?segmentName=${segmentName}`
      );
    }
    if (segmentId) {
      response = await fetchData(
        `${getMarcasBySegmenteIdServerUrl}/?segmentId=${segmentId}`
      );
    }
    if (response?.status !== 200) {
      console.log('Error al obtener marcas por segmento');
      return { marcas: [], status: response?.status };
    }
    const marcas = response?.data?.payload;
    return { marcas, status: 200 };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllProveedoresRequest() {
  try {
    const response = await fetchData(getAllProveedoresServerUrl);
    if (response?.status !== 200) {
      console.log('Error al obtener todas los proveedores');
      return { proveedores: [], status: response?.status };
    }
    const proveedores = response?.data?.payload;
    return { proveedores, status: 200 };
  } catch (error) {
    console.error(error);
  }
}
