import mongoose from 'mongoose';
import { Segment } from '@/backend/segments/domain/models/segment';

export class SegmentRepository {
  constructor() {
    this.segmentModel = Segment;
  }
  async getAllSegments() {
    try {
      const segmentsFound = await this.segmentModel.find();

      if (segmentsFound?.length === 0) {
        console.log('Segment Repository: No se encontraron segmentos');
        return [];
      }

      console.log('Segment Repository: Segmentos encontrados');
      return segmentsFound;
    } catch (error) {
      console.log(error);
      throw new Error(
        `Error interno al buscar todas los segmentos: ${error.message}`
      );
    }
  }

  async getSegmentByData(segmentFilter) {
    try {
      if (Object.keys(segmentFilter).length === 0) {
        console.log('Segment Repository: Segmento no proporcionado');
        return null;
      }

      const filter = {};

      if (segmentFilter.id) {
        filter._id = new mongoose.Types.ObjectId(segmentFilter.id);
      }

      if (segmentFilter.nombre) {
        filter.nombre = {
          $regex: new RegExp(`^${segmentFilter.nombre}$`, 'i'),
        };
      }

      const segmentFound = await this.segmentModel.findOne(filter);

      if (!segmentFound) {
        console.log('Segment Repository: Segmento no encontrado');
        return null;
      }

      console.log('Segment Repository: Segmento encontrado');
      return segmentFound;
    } catch (error) {
      console.error(
        `Segment Repository: Error al buscar el segmento: ${error.message}`
      );
      throw new Error(`Error al buscar el segmento: ${error.message}`);
    }
  }
}
