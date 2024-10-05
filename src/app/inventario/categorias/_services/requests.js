import { fetchData } from '@/lib/fetchData';
import { getAllCategoriesUrl } from '@/lib/urls';

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
