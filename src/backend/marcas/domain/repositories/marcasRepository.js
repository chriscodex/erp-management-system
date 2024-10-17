import mongoose from 'mongoose';
import { Marca } from '@/backend/marcas/domain/models/marca';
import { Segment } from '@/backend/segments/domain/models/segment';

export class MarcaRepository {
  constructor() {
    this.marcaModel = Marca;
    this.segmentModel = Segment;
  }
  async getAllMarcas() {
    try {
      const marcas = await Marca.find().populate('segmentId');

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
  async getMarca(id) {
    try {
      const marca = await Marca.findOne({
        _id: new mongoose.Types.ObjectId(id),
      }).populate('segmentId');

      if (!marca) {
        console.log('Marca Repository: Marca no encontrada');
        return null;
      }

      console.log('Marca Repository: Marca encontrada');
      return marca;
    } catch (error) {
      console.error(
        `Marca Repository: Error al buscar una marca: ${error.message}`
      );
      throw new Error(`Error al buscar una marca: ${error.message}`);
    }
  }
}
