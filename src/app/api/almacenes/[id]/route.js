import { NextResponse } from 'next/server';

import {
  getAlmacenController,
  updateAlmacenController,
} from '@/backend/almacenes/infrastructure/controllers';

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

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await updateAlmacenController(
      request,
      contextRoute
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      'Almcen Route: Error interno actualizar el almacén:',
      error.message
    );
    return NextResponse.json(
      { message: 'Error interno actualizando el almacén' },
      { status: 500 }
    );
  }
}
