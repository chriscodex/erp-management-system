import {
  getAllMarcasServerUrl,
  getMarcasBySegmenteIdServerUrl,
  getAllCategoriesServerUrl,
  getAllProveedoresServerUrl,
  getAllSegmentsServerUrl,
  getSegmentsByFilterServerUrl,
} from '@/lib/urls';
import { fetchData } from '@/lib/fetchData';

export async function getMarcasBySegmentIdRequest(segmentId) {
  try {
    const response = await fetchData(
      `${getMarcasBySegmenteIdServerUrl}/?segmentId=${segmentId}`
    );
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

export async function getAllMarcasRequest() {
  try {
    const response = await fetchData(getAllMarcasServerUrl);
    if (response?.status !== 200) {
      console.log('Error al obtener todas las marcas');
      return { marcas: [], status: response?.status };
    }
    const marcas = response?.data?.payload;
    return { marcas, status: 200 };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllCategoriesRequest() {
  try {
    const response = await fetchData(getAllCategoriesServerUrl);
    if (response?.status !== 200) {
      console.log('Error al obtener todas las categorias');
      return { categories: [], status: response?.status };
    }
    const categories = response?.data?.payload;
    return { categories, status: 200 };
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

export async function getAllSegmentsRequest() {
  try {
    const response = await fetchData(getAllSegmentsServerUrl);
    if (response?.status !== 200) {
      console.log('Error al obtener todos los segmentos');
      return { segments: [], status: response?.status };
    }
    const segments = response?.data?.payload;
    return { segments, status: 200 };
  } catch (error) {
    console.error(error);
  }
}

export async function getSegmentsByFilterRequest(filter) {
  try {
    const url = `${getSegmentsByFilterServerUrl}?nombre=${filter?.nombre}`;
    const response = await fetchData(url);
    if (response?.status !== 200) {
      console.log('Error al obtener el segmento');
      return { segment: null, status: response?.status };
    }
    const segment = response?.data?.payload;
    return { segment, status: 200 };
  } catch (error) {
    console.error(error);
  }
}
