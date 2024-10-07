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
        console.log('Repository: No se encontraron categorías');
        return null;
      }

      console.log('Repository: Categorías encontrados');
      return categories;
    } catch (error) {
      throw new Error(`Error al buscar todas las categorías: ${error.message}`);
    }
  }
  async getCategory(nombre) {
    try {
      const category = await this.categoryModel.findOne({
        nombre: { $regex: new RegExp(`^${nombre}$`, 'i') },
      });

      if (!category) {
        console.log('Repository: Categoría no encontrada');
        return null;
      }

      console.log('Repository: Categoría encontrada');
      return category;
    } catch (error) {
      throw new Error(`Error al buscar un categoría: ${error.message}`);
    }
  }
  async createCategory(categoryData) {
    try {
      const newCategory = new this.categoryModel(categoryData);
      const savedCategory = await newCategory.save();

      console.log('Repository: Categoría creada exitosamente');
      return savedCategory;
    } catch (error) {
      console.log(`Repository: Error al crear categoría: ${error.message}`);
      throw new Error(`Error al crear categoría: ${error.message}`);
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
