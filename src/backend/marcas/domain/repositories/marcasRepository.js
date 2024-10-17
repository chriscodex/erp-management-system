import { Marca } from '@/backend/marcas/domain/models/marca';

export class MarcaRepository {
  async getAllMarcas() {
    try {
      const marcas = await Marca.find();

      if (marcas.length === 0) {
        console.log('Marca Repository: No se encontraron marcas');
        return null;
      }

      console.log('Marca Repository: Marcas encontradas');
      return marcas;
    } catch (error) {
      console.error(
        `Marca Repository: Error al buscar todas las marcas: ${error.message}`
      );
      throw new Error(
        `Marca Repository: Error al buscar todas las marcas: ${error.message}`
      );
    }
  }
}
