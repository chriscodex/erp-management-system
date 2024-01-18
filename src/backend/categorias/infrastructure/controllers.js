import { CategoryService } from '@/backend/categorias/application/category.service';
import { connectDB } from '@/db/mongodb';

const categoryService = new CategoryService();

export async function getCategoriesController(request) {
  try {
    // Extrae los query parameters de la URL
    const { searchParams } = new URL(request.url);
    const segmentId = searchParams.get('segmentId');
    const segmentName = searchParams.get('segmentName');

    if (segmentId !== null && segmentName !== null) {
      return {
        payload:
          'No se pueden filtrar por segmentId y segmentName al mismo tiempo',
        status: 400,
      };
    }

    await connectDB();

    let result;
    if (segmentId !== null || segmentName !== null) {
      result = await categoryService.getCategoriesBySegmentData({
        id: segmentId,
        nombre: segmentName,
      });
    } else {
      result = await categoryService.getAllCategories();
    }

    return result;
  } catch (error) {
    console.error('Controller: Error obteniendo todas las categorias:', error);
    throw new Error(
      'Controller: Internal Server Error - getAllCategoriesController'
    );
  }
}

export async function getCategoriesBySegmentDataController(segmentData) {
  try {
    await connectDB();
    const marcasFiltered = await categoryService.getCategoriesBySegmentData(
      segmentData
    );
    return marcasFiltered;
  } catch (error) {
    console.error(
      'Controller: Error obteniendo las categorías filtradas por segmento:',
      error
    );
    throw new Error(
      'Controller: Error interno obteniendo las categorías filtradas por segmento'
    );
  }
}

export async function createCategoryController(categoryData) {
  try {
    await connectDB();

    /* Responses { payload, status} */
    const createdCategory = await categoryService.createCategory(categoryData);
    return createdCategory;
  } catch (error) {
    console.error('Controller: Error al crear una categoría:', error);
    throw new Error(
      'Controller: Internal Server Error - createCategoryController'
    );
  }
}

export async function updateCategoryController(id, category) {
  try {
    await connectDB();
    const updatedCategory = await categoryService.updateCategory(id, category);
    return updatedCategory;
  } catch (error) {
    console.error('Controller: Error actualizando la categoría:', error);
    throw new Error(
      'Controller: Internal Server Error - updateCategoryController'
    );
  }
}

export async function deleteCategoryController(id) {
  try {
    await connectDB();

    const deletedCategory = await categoryService.deleteCategory(id);
    return deletedCategory;
  } catch (error) {
    console.error('Controller: Error al eliminar categoría:', error);
    throw new Error(
      'Controller: Internal Server Error - deleteCategoryController'
    );
  }
}
