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
      const { id } = categoryData;

      const category = await this.categoryModel
        .findOne({
          $or: [{ _id: new mongoose.Types.ObjectId(id) }],
        })
        .populate('segmentId');

      if (!category) {
        console.log('Category Repository: Categoría no encontrada');
        return null;
      }

      console.log('Category Repository: Categoría encontrada');
      return category;
    } catch (error) {
      console.error(
        `Category Repository: Error al buscar categoría por ID: ${error.message}`
      );
      throw new Error(
        `Error interno al buscar categoría por ID: ${error.message}`
      );
    }
  }

  async getCategoriesBySegmentData(segmentData) {
    try {
      const { id, nombre } = segmentData;

      // Verificar que al menos uno de los parámetros sea enviado
      if (!id && !nombre) {
        console.log(
          'Category Repository: No se proporcionaron parámetros válidos'
        );
        return null; // O puedes lanzar un error si prefieres manejarlo así
      }

      let categoriesFiltered;
      if (id) {
        categoriesFiltered = await this.categoryModel
          .find()
          .populate({
            path: 'segmentId',
            match: {
              $or: [{ _id: new mongoose.Types.ObjectId(id) }],
            },
          })
          .then(
            (results) => results.filter((categoria) => categoria.segmentId) // Solo incluye resultados donde `segmentId` cumple la condición
          );
        console.log('Category Repository: Categorías filtradas por segmentId');
      } else if (nombre) {
        categoriesFiltered = await this.categoryModel
          .find()
          .populate({
            path: 'segmentId',
            match: {
              $or: [{ nombre: { $regex: new RegExp(`^${nombre}$`, 'i') } }],
            },
          })
          .then(
            (results) => results.filter((category) => category.segmentId) // Solo incluye resultados donde `segmentId` cumple la condición
          );
        console.log(
          'Category Repository: Categorías filtradas por segmentName'
        );
      }

      if (categoriesFiltered.length === 0) {
        console.log(
          'Category Repository: No se encontraron categorías filtradas por segmento'
        );
        return null;
      }

      console.log(
        'Category Repository: Categorías filtradas por segmento encontradas'
      );
      return categoriesFiltered;
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
  /* Validaciones */
  async validateCategoryInSegment(segmentId, categoryId) {
    try {
      const category = await this.categoryModel
        .findOne({
          segmentId: new mongoose.Types.ObjectId(segmentId),
          _id: new mongoose.Types.ObjectId(categoryId),
        })
        .populate('segmentId');
      if (!category) {
        console.log(
          'Category Repository: Categoría no encontrada en el segmento'
        );
        return false;
      }
      console.log('Category Repository: Categoría encontrada en el segmento');
      return true;
    } catch (error) {
      console.error(
        `Category Repository: Error al validar categoría en segmento: ${error.message}`
      );
      throw new Error(
        `Error interno al validar categoría en segmento: ${error.message}`
      );
    }
  }
}
