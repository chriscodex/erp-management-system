import { CategoryRepository } from '@/backend/categorias/domain/repositories/categoryRepository.js';

export class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }
  async getAllCategories() {
    try {
      const categories = await this.categoryRepository.getAllCategories();

      if (!categories) {
        return {
          status: 404,
          payload: 'No se encontraron categorias',
        };
      }

      return {
        status: 200,
        payload: categories,
      };
    } catch (error) {
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deleteCategory(id) {
    try {
      const categoryDeleted = await this.categoryRepository.deleteCategory(id);

      if (!categoryDeleted) {
        return {
          status: 404,
          payload: 'La categoría no existe',
        };
      }

      return {
        status: 204,
        payload: categoryDeleted,
      };
    } catch (error) {
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
