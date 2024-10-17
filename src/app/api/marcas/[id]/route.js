import { NextResponse } from 'next/server';
import { getMarcaController } from '@/backend/marcas/infrastructure/controllers';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { payload, status } = await getMarcaController(id);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error obteniendo la marca' },
      { status: 500 }
    );
  }
}
