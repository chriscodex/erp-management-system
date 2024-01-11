import mongoose from 'mongoose';
import { Segment } from '@/backend/segments/domain/models/segment';

export class SegmentRepository {
  constructor() {
    this.segmentModel = Segment;
  }
  async getAllSegments() {
    try {
      const segmentsFound = await this.segmentModel.find();

      if (segmentsFound.length === 0) {
        console.log('Segment Repository: No se encontraron segmentos');
        return null;
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

  async getSegmentById(id) {
    try {
      const segmentFound = await this.segmentModel.findOne({
        _id: new mongoose.Types.ObjectId(id),
      });

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

  async getSegmentByData(segmentFilter) {
    try {
      const segmentFound = await this.segmentModel.findOne(segmentFilter);

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
