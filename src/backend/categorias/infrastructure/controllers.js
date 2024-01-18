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
    console.error(
      'Categorias Controller: Error interno al obtener todas las categorias:',
      error.message
    );
    throw new Error(
      'Categorias Controller: Internal Server Error - getCategoriesController'
    );
  }
}

export async function createCategoryController(request) {
  try {
    const body = await request.json();

    await connectDB();

    const createdCategory = await categoryService.createCategory(body);
    return createdCategory;
  } catch (error) {
    console.error(
      'Categorias Controller: Error interno al crear una categoría:',
      error.message
    );
    throw new Error(
      'Categorias Controller: Internal Server Error - createCategoryController'
    );
  }
}

export async function updateCategoryController(id, category) {
  try {
    await connectDB();
    const updatedCategory = await categoryService.updateCategory(id, category);
    return updatedCategory;
  } catch (error) {
    console.error(
      'Categorias Controller: Error interno al actualizar la categoría:',
      error.message
    );
    throw new Error(
      'Categorias Controller: Internal Server Error - updateCategoryController'
    );
  }
}

export async function deleteCategoryController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;

    await connectDB();

    const deletedCategory = await categoryService.deleteCategory(id);

    return deletedCategory;
  } catch (error) {
    console.error(
      'Categorias Controller: Error interno al eliminar la categoría:',
      error.message
    );
    throw new Error(
      'Categorias Controller: Internal Server Error - deleteCategoryController'
    );
  }
}
