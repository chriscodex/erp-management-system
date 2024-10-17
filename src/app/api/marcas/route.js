import { NextResponse } from 'next/server';
import { getAllMarcasController } from '@/backend/marcas/infrastructure/controllers';

export async function GET() {
  try {
    const { payload, status } = await getAllMarcasController();

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching marcas' },
      { status: 500 }
    );
  }
}