import { SegmentRepository } from '@/backend/segments/domain/repositories/segmentRepository';

export class SegmentService {
  constructor() {
    this.segmentRepository = new SegmentRepository();
  }
  async getAllSegments() {
    try {
      const segments = await this.segmentRepository.getAllSegments();

      if (segments?.length === 0) {
        console.log('Segment Service: No se encontraron segmentos');
        return {
          status: 200,
          payload: [],
        };
      }

      console.log('Segment Service: Segmentos encontradas');
      return {
        status: 200,
        payload: segments,
      };
    } catch (error) {
      console.error(
        `Segment Service: Error interno al obtener todas los segmentos: ${error.message}`,
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getSegmentByData(segmentFilter) {
    try {
      const segmentFiltered =
        await this.segmentRepository.getSegmentByData(segmentFilter);

      if (!segmentFiltered) {
        console.log('Segment Service: No se encontraron segmentos filtrados');
        return {
          status: 404,
          payload: 'No se encontraron segmentos filtrados',
        };
      }

      console.log('Segment Service: Segmentos filtrados encontrados');
      return {
        status: 200,
        payload: segmentFiltered,
      };
    } catch (error) {
      console.error(
        `Segment Service: Error interno al obtener segmentos filtrados: ${error.message}`,
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
