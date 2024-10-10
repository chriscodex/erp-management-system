import { fetchData, deleteData } from '@/lib/fetchData';
import {
  getAllSegmentsUrl,
  getAllCategoriesUrl,
  deleteCategoryUrl,
  createCategoryUrl,
} from '@/lib/urls';
import { postData } from '@/lib/fetchData';

export async function getAllCategories() {
  try {
    const response = await fetchData(getAllCategoriesUrl);
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

export async function getAllSegments() {
  try {
    const response = await fetchData(getAllSegmentsUrl);
    if (response?.status !== 200) {
      console.log('Error al obtener todos los segmentos');
      return { categories: [], status: 500 };
    }
    const segments = response?.data?.payload;
    return { segments, status: 200 };
  } catch (error) {
    console.error(error);
  }
}

/* eslint-disable */
export async function createCategory(category, setLoading) {
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Obtener los datos de la persona
      const response = await postData(createCategoryUrl, category);
      if (response?.status !== 201) {
        setLoading(false);
        reject(
          'No se pudo crear la categoría: ' + response.response?.data?.error
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

/* eslint-disable */
export async function deleteCategory(id) {
  return new Promise(async (resolve, reject) => {
    try {
      // Simular tiempo de retraso
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const url = `${deleteCategoryUrl}/${id}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar la categoría: ' + response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}
/* eslint-enable */
