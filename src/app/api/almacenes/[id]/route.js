import { NextResponse } from 'next/server';

import { getAlmacenController } from '@/backend/almacenes/infrastructure/controllers';

export async function GET(_, contextRoute) {
  try {
    const { payload, status } = await getAlmacenController(contextRoute);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Almacenes Route: Error interno al obtener el almacen: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno obteniendo el almacen' },
      { status: 500 }
    );
  }
}
