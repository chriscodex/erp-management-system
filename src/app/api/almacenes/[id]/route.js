import { NextResponse } from 'next/server';

import { getAlmacenController } from '@/backend/almacenes/infrastructure/controllers';

export async function GET(_, routeContext) {
  try {
    const { payload, status } = await getAlmacenController(routeContext);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Almacenes Route: Error interno al obtener el almacen: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error obteniendo el almacen' },
      { status: 500 }
    );
  }
}
