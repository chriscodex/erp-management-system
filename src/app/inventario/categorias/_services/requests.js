import { fetchData, postData, deleteData, patchData } from '@/lib/fetchData';
import {
  getAllSegmentsUrl,
  getAllCategoriesUrl,
  createCategoryUrl,
  updateCategoryUrl,
  deleteCategoryUrl,
} from '@/lib/urls';

export async function getAllCategoriesRequest() {
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

export async function getAllSegmentsRequest() {
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
export async function createCategoryRequest(category, setLoading) {
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
export async function updateCategoryRequest(category, setLoading) {
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const { _id: id } = category;
      const url = `${updateCategoryUrl}/${id}`;

      // Obtener los datos de la persona
      const response = await patchData(url, category);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar la categoría: ' +
            response.response?.data?.error
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
export async function deleteCategoryRequest(id) {
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
