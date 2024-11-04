import { NextResponse } from 'next/server';
import {
  getAllSegmentsController,
  getSegmentByFilter,
} from '@/backend/segments/infrastructure/controller';

export async function GET(request) {
  try {
    // Extrae los query parameters de la URL
    const { searchParams } = new URL(request.url);
    const segmentName = searchParams.get('nombre');

    let result;
    if (segmentName !== null) {
      result = await getSegmentByFilter({
        nombre: segmentName,
      });
    } else {
      result = await getAllSegmentsController();
    }

    const { payload, status } = result;

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Segments Route: Error interno al obtener todas los segmentos: ${error.message}`
    );
    return NextResponse.json(
      { error: 'Error obteniendo todas los segmentos' },
      { status: 500 }
    );
  }
}
