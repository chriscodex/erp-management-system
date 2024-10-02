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
}
