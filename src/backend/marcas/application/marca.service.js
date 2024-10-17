import { MarcaRepository } from '@/backend/marcas/domain/repositories/marcasRepository';

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
}
