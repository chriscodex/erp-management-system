import { CategoryService } from '@/backend/categorias/application/category.service';
import { connectDB } from '@/db/mongodb';

const categoryService = new CategoryService();

export async function getAllCategoriesController() {
  try {
    await connectDB();
    const categories = await categoryService.getAllCategories();
    return categories;
  } catch (error) {
    console.error('Controller: Error obteniendo todas las categorias:', error);
    throw new Error(
      'Controller: Internal Server Error - getAllCategoriesController'
    );
  }
}

export async function getAllCategoriesByFilterController() {
  try {
    await connectDB();
    const categoriesFiltered = await categoryService.getAllCategoriesByFilter();
    return categoriesFiltered;
  } catch (error) {
    console.error(
      'Controller: Error obteniendo todas las categorias por filtro:',
      error
    );
    throw new Error(
      'Controller: Internal Server Error - getAllCategoriesByFilterController'
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
