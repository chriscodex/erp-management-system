import { fetchData, deleteData } from '@/lib/fetchData';
import { getAllCategoriesUrl, deleteCategoryUrl } from '@/lib/urls';

export async function getAllCategories() {
  try {
    const response = await fetchData(getAllCategoriesUrl);
    if (response?.status !== 200) {
      console.log('Error al obtener las categorias');
      return { categories: [], status: 500 };
    }
    console.log(response);
    const categories = response?.data?.payload;
    return { categories, status: 200 };
  } catch (error) {
    console.log(error);
  }
}

/* eslint-disable */
export async function deleteCategory(id) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(id);
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
