import { NextResponse } from 'next/server';
import { getSegmentsController } from '@/backend/segments/infrastructure/controller';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { payload, status } = await getSegmentsController(request);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Segments Route: Error interno al obtener todas los segmentos: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno obteniendo todas los segmentos' },
      { status: 500 },
    );
  }
}
