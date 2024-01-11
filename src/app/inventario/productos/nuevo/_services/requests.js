import {
  getMarcasBySegmentDataServerUrl,
  getCategoriesBySegmentDataServerUrl,
  getAllProveedoresServerUrl,
  getSegmentsByFilterServerUrl,
  getAllAlmacenesServerUrl,
  createProductClientUrl,
} from '@/lib/urls';
import { fetchData } from '@/lib/fetchData';
import { delay } from '@/lib/utils';

export async function getSegmentByDataRequest(segmentFilter) {
  try {
    const response = await fetchData(
      `${getSegmentsByFilterServerUrl}/?nombre=${segmentFilter}`
    );
    if (response?.status !== 200) {
      console.log('Error al obtener el segmento filtrado');
      return { segment: null, status: response?.status };
    }
    const segment = response?.data?.payload;
    return { segment, status: 200 };
  } catch (error) {
    console.error(error);
  }
}

export async function getCategoriesBySegmentDataRequest(segmentData) {
  try {
    const { segmentId, segmentName } = segmentData;
    let response;
    if (segmentName) {
      response = await fetchData(
        `${getCategoriesBySegmentDataServerUrl}/?segmentName=${segmentName}`
      );
    }
    if (segmentId) {
      response = await fetchData(
        `${getCategoriesBySegmentDataServerUrl}/?segmentId=${segmentId}`
      );
    }
    if (response?.status !== 200) {
      console.log('Error al obtener la categorías por segmento');
      return { categories: [], status: response?.status };
    }
    const categories = response?.data?.payload;
    return { categories, status: 200 };
  } catch (error) {
    console.error(error);
  }
}

export async function getMarcasBySegmentDataRequest(segmentData) {
  try {
    const { segmentId, segmentName } = segmentData;
    let response;
    if (segmentName) {
      response = await fetchData(
        `${getMarcasBySegmentDataServerUrl}/?segmentName=${segmentName}`
      );
    }
    if (segmentId) {
      response = await fetchData(
        `${getMarcasBySegmentDataServerUrl}/?segmentId=${segmentId}`
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

export async function getAllAlmacenesRequest() {
  try {
    const response = await fetchData(getAllAlmacenesServerUrl);
    if (response?.status !== 200) {
      console.log('Error al obtener todos los almacenes');
      return { almacenes: [], status: 500 };
    }
    const almacenes = response?.data?.payload;
    return { almacenes, status: 200 };
  } catch (error) {
    console.error(error);
  }
}

/* eslint-disable */
export async function createProductRequest(product, setLoading) {
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso para pruebas en la UI
      await delay();

      // Obtener los datos del producto
      const response = await postData(createProductClientUrl, product);
      if (response?.status !== 201) {
        setLoading(false);
        reject(
          'No se pudo crear el producto: ' + response.response?.data?.error
        );
        return;
      }

      setLoading(false);
      resolve(response?.response?.data?.payload);
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}
/* eslint-enable */
