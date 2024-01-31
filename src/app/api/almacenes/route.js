import { NextResponse } from 'next/server';

import { getAllAlmacenesController } from '@/backend/almacenes/infrastructure/controllers';

export async function GET() {
  try {
    const { payload, status } = await getAllAlmacenesController();

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Almacenes Route: Error interno al obtener todas los almacenes: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno obteniendo los almacenes' },
      { status: 500 }
    );
  }
}
