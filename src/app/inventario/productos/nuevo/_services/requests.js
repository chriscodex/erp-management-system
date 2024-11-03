import {
  getAllMarcasServerUrl,
  getAllCategoriesServerUrl,
  getAllProveedoresServerUrl,
} from '@/lib/urls';
import { fetchData } from '@/lib/fetchData';

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
