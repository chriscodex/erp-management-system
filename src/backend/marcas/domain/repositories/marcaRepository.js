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
      const marcas = await this.marcaModel.find().populate('segmentId');

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
  async getMarcaById(id) {
    try {
      const marca = await this.marcaModel
        .findOne({
          _id: new mongoose.Types.ObjectId(id),
        })
        .populate('segmentId');

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
  async getMarcaByData(marca) {
    try {
      const { nombre, segmentId } = marca;
      const marcaFound = await this.marcaModel.findOne({
        nombre: { $regex: new RegExp(`^${nombre}$`, 'i') },
        $or: [
          { segmentId: new mongoose.Types.ObjectId(segmentId) }, // Coincide con el segmentId proporcionado
          { segmentId: null }, // O permite segmentId nulo
        ],
      });

      if (!marcaFound) {
        console.log('Marca Repository: Marca no encontrada');
        return null;
      }

      console.log('Marca Repository: Marca encontrada');
      return marcaFound;
    } catch (error) {
      console.error(
        `Marca Repository: Error al buscar la marca: ${error.message}`
      );
      throw new Error(`Error al buscar una marca: ${error.message}`);
    }
  }
  async createMarca(marca) {
    try {
      const newMarca = new this.marcaModel(marca);
      const savedMarca = await newMarca.save();

      console.log('Marca Repository: Marca creada correctamente');
      return savedMarca;
    } catch (error) {
      console.log(
        `Marca Repository: Error al crear la marca: ${error.message}`
      );
      throw new Error(`Error al crear la marca: ${error.message}`);
    }
  }
  async deleteMarca(id) {
    try {
      const deletedMarca = await this.marcaModel.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(id),
      });

      if (!deletedMarca) {
        console.log('Marca Repository: Marca no encontrada para ser eliminado');
        return null;
      }

      console.log('Marca Repository: Marca encontrada y eliminada');
      return deletedMarca;
    } catch (error) {
      console.error(
        `Marca Repository: Error al eliminar una marca: ${error.message}`
      );
      throw new Error(`Error al eliminar la marca: ${error.message}`);
    }
  }
}
