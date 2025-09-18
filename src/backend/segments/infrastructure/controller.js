import { connectDB } from '@/db/mongodb';
import { SegmentService } from '@/backend/segments/application/segments.service.js';

const segmentService = new SegmentService();

export async function getSegmentsController(request) {
  try {
    // Extrae los query parameters de la URL
    const { searchParams } = new URL(request.url);
    const segmentName = searchParams.get('nombre');

    await connectDB();

    let result;

    if (segmentName !== null) {
      result = await segmentService.getSegmentByData({
        nombre: segmentName,
      });
    } else {
      result = await segmentService.getAllSegments();
    }

    return result;
  } catch (error) {
    console.error(
      'Segments Controller: Error interno al obtener todos los segmentos:',
      error.message,
    );
    throw new Error(
      'Segments Controller: Error interno al obtener todos los segmentos',
    );
  }
}
