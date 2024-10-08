import { CategoryService } from '@/backend/categorias/application/category.service';
import { connectDB } from '@/db/mongodb';

const categoryService = new CategoryService();

export async function getAllCategoriesController() {
  try {
    await connectDB();
    const categories = await categoryService.getAllCategories();
    return categories;
  } catch (error) {
    console.error('Controller: Error fetching categories:', error);
    throw new Error(
      'Controller: Internal Server Error - getAllCategoriesController'
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
