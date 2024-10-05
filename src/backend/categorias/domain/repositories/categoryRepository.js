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

  async deleteCategory(id) {
    try {
      const deletedCategory = await this.categoryModel.findOneAndDelete(id);

      if (!deletedCategory) {
        console.log('Repo: Categoría no encontrada para ser eliminado');
        return null;
      }

      console.log('Repo: Categoría encontrada y eliminada');
      return deletedCategory;
    } catch (error) {
      throw new Error(`Error al eliminar categoría: ${error.message}`);
    }
  }
}
