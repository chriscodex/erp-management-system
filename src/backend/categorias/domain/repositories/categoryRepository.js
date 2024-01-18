import mongoose from 'mongoose';
import { Category } from '@/backend/categorias/domain/models/category';
import { Segment } from '@/backend/segments/domain/models/segment';

export class CategoryRepository {
  constructor() {
    this.categoryModel = Category;
    this.segmentModel = Segment;
  }

  async getAllCategories() {
    try {
      const categories = await this.categoryModel.find().populate('segmentId');

      if (categories.length === 0) {
        console.log('Category Repository: No se encontraron categorías');
        return null;
      }

      console.log('Category Repository: Categorías encontrados');
      return categories;
    } catch (error) {
      console.error(
        `Category Repository: Error al buscar todas las categorías: ${error.message}`
      );
      throw new Error(
        `Error interno al buscar todas las categorías: ${error.message}`
      );
    }
  }
  async getCategoryByData(categoryData) {
    try {
      if (!categoryData) {
        console.log('Category Repository: Categoría no proporcionada');
        return null;
      }

      const filter = {};

      if (categoryData.id) {
        filter._id = new mongoose.Types.ObjectId(categoryData.id);
      }

      if (categoryData.nombre) {
        filter.nombre = { $regex: new RegExp(`^${categoryData.nombre}$`, 'i') };
      }

      if (categoryData.segmentId) {
        filter.segmentId = new mongoose.Types.ObjectId(categoryData.segmentId);
      }

      const categoryFound = await this.categoryModel
        .findOne(filter)
        .populate('segmentId');

      if (!categoryFound) {
        console.log('Category Repository: Categoría no encontrada');
        return null;
      }

      console.log('Category Repository: Categoría encontrada');
      return categoryFound;
    } catch (error) {
      console.error(
        `Category Repository: Error al buscar categoría por filtro: ${error.message}`
      );
      throw new Error(
        `Error interno al buscar categoría por filtro: ${error.message}`
      );
    }
  }

  async getCategoriesBySegmentData(segmentData) {
    try {
      if (!segmentData) {
        console.log('Category Repository: Categoría no proporcionada');
        return null;
      }

      const filter = {};

      if (segmentData.id) {
        filter._id = new mongoose.Types.ObjectId(segmentData.id);
      }

      if (segmentData.nombre) {
        filter.nombre = { $regex: new RegExp(`^${segmentData.nombre}$`, 'i') };
      }

      const categoriesFilteredBySegmentData = await this.categoryModel
        .find()
        .populate({
          path: 'segmentId',
          match: filter,
        })
        .then(
          (results) => results.filter((category) => category.segmentId) // Solo incluye resultados donde `segmentId` cumple la condición
        );

      if (categoriesFilteredBySegmentData.length === 0) {
        console.log(
          'Category Repository: No se encontraron categorías filtradas por segmento'
        );
        return null;
      }

      console.log(
        'Category Repository: Categorías filtradas por segmento encontradas'
      );
      return categoriesFilteredBySegmentData;
    } catch (error) {
      console.error(
        `Category Repository: Error al buscar categorías filtradas por segmento: ${error.message}`
      );
      throw new Error(
        `Error interno al buscar categorías filtradas por segmento: ${error.message}`
      );
    }
  }
  async createCategory(categoryData) {
    try {
      const newCategory = new this.categoryModel(categoryData);
      const savedCategory = await newCategory.save();

      console.log('Category Repository: Categoría creada exitosamente');
      return savedCategory;
    } catch (error) {
      console.log(
        `Category Repository: Error al crear categoría: ${error.message}`
      );
      throw new Error(`Error al crear categoría: ${error.message}`);
    }
  }
  async updateCategory(id, category) {
    try {
      const updatedCategory = await this.categoryModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        category,
        {
          new: true,
        }
      );

      if (!updatedCategory) {
        console.log(
          'Category Repository: Categoría no encontrada para ser actualizada'
        );
        return null;
      }

      console.log('Category Repository: Categoría actualizada correctamente');
      return updatedCategory;
    } catch (error) {
      console.error(
        `Category Repository: Error al actualizar categoría: ${error.message}`
      );
      throw new Error(`Error al actualizar categoría: ${error.message}`);
    }
  }
  async deleteCategory(id) {
    try {
      const deletedCategory = await this.categoryModel.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(id),
      });

      if (!deletedCategory) {
        console.log(
          'Category Repository: Categoría no encontrada para ser eliminado'
        );
        return null;
      }

      console.log('Category Repository: Categoría encontrada y eliminada');
      return deletedCategory;
    } catch (error) {
      console.error(
        `Category Repository: Error al eliminar una categoría: ${error.message}`
      );
      throw new Error(`Error al eliminar categoría: ${error.message}`);
    }
  }
}
