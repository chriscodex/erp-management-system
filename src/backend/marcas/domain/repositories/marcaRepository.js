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
      const marcas = await this.marcaModel.find({}).populate('segmentId');

      if (marcas?.length === 0) {
        console.log('Marca Repository: No se encontraron marcas');
        return [];
      }

      console.log('Marca Repository: Marcas encontradas');
      return marcas;
    } catch (error) {
      console.error(
        `Marca Repository: Error al buscar todas las marcas: ${error}`,
      );
      throw new Error(
        `Marca Repository: Error al buscar todas las marcas: ${error}`,
      );
    }
  }
  async getMarcasBySegmentData(marcaAndSegmentData) {
    try {
      const segmentFilter = {};
      const marcaFilter = {};

      /* Filtros para el segmento */
      if (marcaAndSegmentData.segmentId) {
        segmentFilter._id = new mongoose.Types.ObjectId(
          marcaAndSegmentData.segmentId,
        );
      }

      if (marcaAndSegmentData.nombre) {
        segmentFilter.nombre = {
          $regex: new RegExp(`^${marcaAndSegmentData.nombre}$`, 'i'),
        };
      }

      /* Filtros para la marca */
      if (marcaAndSegmentData.marcaEstado) {
        marcaFilter.estado = marcaAndSegmentData.marcaEstado;
      }

      // Buscar las marcas usando los filtros
      const marcasFiltered = await this.marcaModel
        .find(marcaFilter)
        .populate({
          path: 'segmentId',
          match: segmentFilter,
        })
        .then(
          (results) => results.filter((marca) => marca.segmentId), // Solo incluye resultados donde `segmentId` cumple la condición
        );

      if (marcasFiltered?.length === 0) {
        console.log(
          'Marca Repository: No se encontraron marcas filtradas por segmento',
        );
        return [];
      }

      console.log(
        'Marca Repository: Marcas filtradas por segmento encontradas',
      );
      return marcasFiltered;
    } catch (error) {
      console.error(
        `Marca Repository: Error al buscar marcas filtradas por segmento: ${error.message}`,
      );
      throw new Error(
        `Error interno al buscar marcas filtradas por segmento: ${error.message}`,
      );
    }
  }
  async getMarcaByData(marcaData) {
    try {
      if (!marcaData) {
        console.log('Marca Repository: Marca no proporcionada');
        return null;
      }

      const filter = {};

      if (marcaData.segmentId) {
        filter.segmentId = new mongoose.Types.ObjectId(marcaData.segmentId);
      }

      if (marcaData.id) {
        filter._id = new mongoose.Types.ObjectId(marcaData.id);
      }

      if (marcaData.nombre) {
        filter.nombre = { $regex: new RegExp(`^${marcaData.nombre}$`, 'i') };
      }
      const marcaFound = await this.marcaModel
        .findOne(filter)
        .populate('segmentId');

      if (!marcaFound) {
        console.log('Marca Repository: Marca no encontrada');
        return null;
      }

      console.log('Marca Repository: Marca encontrada');
      return marcaFound;
    } catch (error) {
      console.error(
        `Marca Repository: Error al buscar la marca: ${error.message}`,
      );
      throw new Error(`Error al buscar una marca: ${error.message}`);
    }
  }
  async createMarca(marca) {
    try {
      const newMarca = new this.marcaModel(marca);
      const savedMarca = await newMarca.save();

      // Populamos el campo segmentId después de guardar
      const populatedMarca = await savedMarca.populate('segmentId');

      console.log('Marca Repository: Marca creada correctamente');
      return populatedMarca;
    } catch (error) {
      console.log(
        `Marca Repository: Error al crear la marca: ${error.message}`,
      );
      throw new Error(`Error al crear la marca: ${error.message}`);
    }
  }
  async updateMarca(id, marca) {
    try {
      const updatedMarca = await this.marcaModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        marca,
        {
          new: true,
        },
      );

      if (!updatedMarca) {
        console.log(
          'Marca Repository: Marca no encontrada para ser actualizada',
        );
        return null;
      }

      console.log('Marca Repository: Marca actualizada correctamente');
      return updatedMarca;
    } catch (error) {
      console.error(
        `Marca Repository: Error al actualizar la marca: ${error.message}`,
      );
      throw new Error(`Error al actualizar la marca: ${error.message}`);
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
        `Marca Repository: Error al eliminar una marca: ${error.message}`,
      );
      throw new Error(`Error al eliminar la marca: ${error.message}`);
    }
  }
}
