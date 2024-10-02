import { Category } from '@/backend/categorias/domain/models/category';

export class CategoryRepository {
  async getAllCategories() {
    try {
      const categories = await Category.find();

      if (categories.length === 0) {
        console.log('No se encontraron categorías');
        return null;
      }

      console.log('Categorías encontrados');
      return categories;
    } catch (error) {
      throw new Error(`Error al buscar todos las categorías: ${error.message}`);
    }
  }
}
