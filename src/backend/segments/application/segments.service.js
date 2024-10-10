import { SegmentRepository } from '@/backend/segments/domain/repositories/segmentRepository';

export class SegmentService {
  constructor() {
    this.segmentRepository = new SegmentRepository();
  }
  async getAllSegments() {
    try {
      const categories = await this.segmentRepository.getAllSegments();

      if (!categories) {
        console.log('Category Service: No se encontraron categorias');
        return {
          status: 404,
          payload: 'No se encontraron categorias',
        };
      }

      console.log('Category Service: Categorías encontradas');
      return {
        status: 200,
        payload: categories,
      };
    } catch (error) {
      console.error(
        `Service: Error interno al obtener todas las categorías: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
