import { MarcaRepository } from '@/backend/marcas/domain/repositories/marcaRepository';

export class MarcaService {
  constructor() {
    this.marcaRepository = new MarcaRepository();
  }
  async getAllMarcas() {
    try {
      const marcas = await this.marcaRepository.getAllMarcas();

      if (!marcas) {
        console.log('Marca Service: No se encontraron marcas');
        return {
          status: 404,
          payload: 'No se encontraron marcas',
        };
      }

      console.log('Marca Service: marcas encontradas');
      return {
        status: 200,
        payload: marcas,
      };
    } catch (error) {
      console.error(
        `Marca Service: Error interno al buscar todas las marcas: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getMarca(id) {
    try {
      const marcaFound = await this.marcaRepository.getMarca(id);

      if (!marcaFound) {
        console.log('Marca Service: La marca no existe');
        return {
          status: 404,
          payload: 'La marca no existe',
        };
      }

      console.log('Marca Service: La marca existe');
      return {
        status: 200,
        payload: marcaFound,
      };
    } catch (error) {
      console.error(
        `Marca Service: Error interno al buscar una marca: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deleteMarca(id) {
    try {
      const marcaDeleted = await this.marcaRepository.deleteMarca(id);

      if (!marcaDeleted) {
        console.log('Marca Service: Marca no encontrada para ser eliminada');
        return {
          status: 404,
          payload: 'La categoría no existe',
        };
      }

      console.log('Marca Service: Marca eliminada correctamente');
      return {
        status: 204,
        payload: marcaDeleted,
      };
    } catch (error) {
      console.error(
        `Marca Service: Error interno al eliminar la marca: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
