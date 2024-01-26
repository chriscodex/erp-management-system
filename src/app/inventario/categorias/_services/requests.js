import { postData, deleteData, patchData } from '@/lib/fetchData';
import {
  createCategoryClientUrl,
  updateCategoryClientUrl,
  deleteCategoryClientUrl,
} from '@/lib/urls';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

import { connectDB } from '@/db/mongodb';
import { SegmentService } from '@/backend/segments/application/segments.service';
import { CategoryService } from '@/backend/categorias/application/category.service';

export async function getAllCategoriesRequest() {
  try {
    await connectDB();
    const categoryService = new CategoryService();

    const response = await categoryService.getAllCategories();
    if (response?.status !== 200) {
      console.log('Error al obtener todas las categorias');
      return { categories: [], status: response?.status };
    }
    const categories = response?.payload;
    return {
      categories: simplificadorParaClientComponent(categories),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllSegmentsRequest() {
  try {
    await connectDB();
    const segmentService = new SegmentService();

    const response = await segmentService.getAllSegments();

    if (response?.status !== 200) {
      console.log('Error al obtener todos los segmentos');
      return { categories: [], status: 500 };
    }
    const segments = response?.payload;
    return { segments, status: 200 };
  } catch (error) {
    console.error(error);
  }
}

export async function createCategoryRequest(category, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      // Obtener los datos de la persona
      const response = await postData(createCategoryClientUrl, category);
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

export async function updateCategoryRequest(category, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const { _id: id } = category;
      const url = `${updateCategoryClientUrl}/${id}`;

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

export async function deleteCategoryRequest(id) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteCategoryClientUrl}/${id}`;

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
