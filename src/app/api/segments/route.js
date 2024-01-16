import { NextResponse } from 'next/server';
import { getSegmentsController } from '@/backend/segments/infrastructure/controller';

export async function GET(request) {
  try {
    const segments = await getSegmentsController(request);

    const { payload, status } = segments;

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
