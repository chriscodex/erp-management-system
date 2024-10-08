import { CategoryRepository } from '@/backend/categorias/domain/repositories/categoryRepository.js';
import { createCategorySchema } from '@/backend/categorias/application/validations/createCategorySchema';

export class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }
  async getAllCategories() {
    try {
      const categories = await this.categoryRepository.getAllCategories();

      if (!categories) {
        console.log('Service: No se encontraron categorias');
        return {
          status: 404,
          payload: 'No se encontraron categorias',
        };
      }

      console.log('Service: Categorías encontradas');
      return {
        status: 200,
        payload: categories,
      };
    } catch (error) {
      console.log(
        `Service: Error interno al obtener todas las categorías: ${error.message}`
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
        console.log('Service: Categoría no encontrada para ser eliminada');
        return {
          status: 404,
          payload: 'La categoría no existe',
        };
      }

      console.log('Service: Categoría eliminada correctamente');
      return {
        status: 204,
        payload: categoryDeleted,
      };
    } catch (error) {
      console.log(
        `Service: Error interno al borrar categoría: ${error.message}`
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
          'Service: Error de validación de schema de categoría al crear'
        );
        return {
          status: 400,
          payload: categoryValidated.error.issues,
        };
      }

      // Validar si una categoría con ese nombre ya existe
      const categoryFound = await this.categoryRepository.getCategory(
        category.nombre
      );
      if (categoryFound) {
        console.log('Service: La categoría ya existe');
        return {
          status: 409,
          payload: 'La categoría ya existe',
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

      console.log('Service: Categoría creada correctamente');
      return {
        status: 201,
        payload: categoryCreated,
      };
    } catch (error) {
      console.log(
        `Service: Error interno al crear categoría: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
