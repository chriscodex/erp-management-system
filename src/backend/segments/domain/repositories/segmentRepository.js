import { Segment } from '@/backend/segments/domain/models/segment';

export class SegmentRepository {
  constructor() {
    this.segmentModel = Segment;
  }
  async getAllSegments() {
    try {
      const segments = await this.segmentModel.find();

      if (segments.length === 0) {
        console.log('Segment Repository: No se encontraron segmentos');
        return null;
      }

      console.log('Segment Repository: Segmentos encontrados');
      return segments;
    } catch (error) {
      console.log(error);
      throw new Error(
        `Error interno al buscar todas los segmentos: ${error.message}`
      );
    }
  }
}
