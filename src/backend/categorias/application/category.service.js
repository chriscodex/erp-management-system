import { CategoryRepository } from '@/backend/categorias/domain/repositories/categoryRepository.js';
import { SegmentRepository } from '@/backend/segments/domain/repositories/segmentRepository';
import { createCategorySchema } from '@/backend/categorias/application/validations/createCategorySchema';
import { updateCategorySchema } from '@/backend/categorias/application/validations/updateCategorySchema';

export class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.segmentRepository = new SegmentRepository();
  }
  async getAllCategories() {
    try {
      const categories = await this.categoryRepository.getAllCategories();

      if (!categories) {
        console.log('Category Service: No se encontraron categorias');
        return {
          status: 404,
          payload: 'No se encontraron categorias',
        };
      }

      console.log('Category Service: Categorías encontradas');
      return {
        status: 200,
        payload: categories,
      };
    } catch (error) {
      console.error(
        `Service: Error interno al obtener todas las categorías: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getCategoriesBySegmentId(id) {
    try {
      const categoriesFiltered =
        await this.categoryRepository.getCategoriesBySegmentId(id);

      if (!categoriesFiltered) {
        console.log(
          'Category Service: No se encontraron categorias filtradas por segmento'
        );
        return {
          status: 404,
          payload: 'No se encontraron categorias filtradas por segmento',
        };
      }

      console.log(
        'Category Service: Categorías filtradas por segmento encontradas'
      );
      return {
        status: 200,
        payload: categoriesFiltered,
      };
    } catch (error) {
      console.error(
        `Service: Error interno al obtener categorias filtradas por segmento: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getCategoryBySegmentData(segmentData) {
    try {
      const categoriesFiltered =
        await this.categoryRepository.getCategoryBySegmentData(segmentData);

      if (!categoriesFiltered) {
        console.log(
          'Category Service: No se encontraron categorías filtradas por segmento'
        );
        return {
          status: 404,
          payload: 'No se encontraron categorías filtradas por segmento',
        };
      }

      console.log(
        'Category Service: Categorías filtradas por segmento encontradas'
      );
      return {
        status: 200,
        payload: categoriesFiltered,
      };
    } catch (error) {
      console.error(
        `Category Service: Error interno al obtener categorías filtradas por segmento: ${error.message}`
      );
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
        console.log(
          'Category Service: Categoría no encontrada para ser eliminada'
        );
        return {
          status: 404,
          payload: 'La categoría no existe',
        };
      }

      console.log('Category Service: Categoría eliminada correctamente');
      return {
        status: 204,
        payload: categoryDeleted,
      };
    } catch (error) {
      console.error(
        `Category Service: Error interno al borrar categoría: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async createCategory(category) {
    try {
      // Validar los datos de la categoría enviado con el schema
      const categoryValidated = createCategorySchema.safeParse(category);

      if (!categoryValidated.success) {
        console.log(
          `Category Service: Error de validación de schema de categoría al crear ${categoryValidated}`
        );
        return {
          status: 400,
          payload: categoryValidated.error.issues,
        };
      }

      // Validar si el segmento existe
      const segmentFound = await this.segmentRepository.getSegmentById(
        category.segmentId
      );
      if (!segmentFound) {
        console.log('Category Service: El segmento no existe');
        return {
          status: 404,
          payload: 'El segmento no existe',
        };
      }

      // Validar si una categoría con ese nombre y en el mismo segmento ya existe
      const categoryFound = await this.categoryRepository.getCategory(category);
      if (categoryFound) {
        console.log(
          'Category Service: La categoría ya existe en este segmento'
        );
        return {
          status: 409,
          payload: 'La categoría ya existe en este segmento',
        };
      }

      // Crear el objeto de categoría que será guardado en la base de datos
      const categoryObject = {
        ...category,
        estado: 'activo',
      };

      // Crear el usuario
      const categoryCreated = await this.categoryRepository.createCategory(
        categoryObject
      );

      console.log('Category Service: Categoría creada correctamente');
      return {
        status: 201,
        payload: categoryCreated,
      };
    } catch (error) {
      console.error(
        `Category Service: Error interno al crear categoría: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async updateCategory(id, category) {
    try {
      // Validar los datos del usuario enviado con el schema
      const categoryValidated = updateCategorySchema.safeParse(category);

      if (!categoryValidated.success) {
        console.log(
          'Category Service: Error de validación de schema de categoría al actualizar'
        );
        return {
          status: 400,
          payload: categoryValidated.error.issues,
        };
      }

      // Validar si una categoría con ese nombre y en el mismo segmento ya existe
      const categoryFound = await this.categoryRepository.getCategory(category);
      if (categoryFound) {
        console.log(
          'Category Service: Una categoría con el mismo nombre ya existe en el segmento seleccionado'
        );
        return {
          status: 409,
          payload:
            'Una categoría con el mismo nombre ya existe en el segmento seleccionado',
        };
      }

      const categoryUpdated = await this.categoryRepository.updateCategory(
        id,
        category
      );

      if (!categoryUpdated) {
        console.log('Category Service: La categoría no existe');
        return {
          status: 404,
          payload: 'La categoría no existe',
        };
      }

      console.log('Category Service: Categoría actualizada correctamente');
      return {
        status: 200,
        payload: categoryUpdated,
      };
    } catch (error) {
      console.error(
        `Category Service: Error interno al actualizar una categoría: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
