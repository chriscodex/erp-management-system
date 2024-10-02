import { Category } from '@/backend/categorias/domain/models/category';
import { Segment } from '@/backend/categorias/domain/models/segment.js';

export class CategoryRepository {
  constructor() {
    this.categoryModel = Category;
    this.segmentModel = Segment;
  }

  async getAllCategories() {
    try {
      const categories = await this.categoryModel.find().populate('segmentId');

      if (categories.length === 0) {
        console.log('No se encontraron categorías');
        return null;
      }

      console.log('Categorías encontrados');
      return categories;
    } catch (error) {
      throw new Error(`Error al buscar todas las categorías: ${error.message}`);
    }
  }
}
