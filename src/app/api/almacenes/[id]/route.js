import { NextResponse } from 'next/server';

import { getAlmacenByIdController } from '@/backend/almacenes/infrastructure/controllers';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { payload, status } = await getAlmacenByIdController(id);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error obteniendo el almacen' },
      { status: 500 }
    );
  }
}