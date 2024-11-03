import { getAllMarcasUrlServer, getAllCategoriesUrlServer } from '@/lib/urls';
import { fetchData } from '@/lib/fetchData';

export async function getAllMarcasRequest() {
  try {
    const response = await fetchData(getAllMarcasUrlServer);
    if (response?.status !== 200) {
      console.log('Error al obtener todas las marcas');
      return { marcas: [], status: 500 };
    }
    const marcas = response?.data?.payload;
    return { marcas, status: 200 };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllCategoriesRequest() {
  try {
    const response = await fetchData(getAllCategoriesUrlServer);
    if (response?.status !== 200) {
      console.log('Error al obtener todas las categorias');
      return { categories: [], status: 500 };
    }
    const categories = response?.data?.payload;
    return { categories, status: 200 };
  } catch (error) {
    console.error(error);
  }
}
