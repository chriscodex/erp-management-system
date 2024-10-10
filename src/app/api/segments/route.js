import { NextResponse } from 'next/server';
import { getAllSegmentsController } from '@/backend/segments/infrastructure/controller';

export async function GET() {
  try {
    const { payload, status } = await getAllSegmentsController();

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error obteniendo los segmentos' },
      { status: 500 }
    );
  }
}
