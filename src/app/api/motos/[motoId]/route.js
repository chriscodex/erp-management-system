import { NextResponse } from 'next/server';

import {
  deleteMotoController,
  updateMotoController,
} from '@/backend/motos/infrastructure/controllers';

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deleteMotoController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      'Moto Route: Error interno eliminar una moto:',
      error.message
    );
    return NextResponse.json(
      { error: 'Error eliminando el producto' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await updateMotoController(
      request,
      contextRoute
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      'Moto Route: Error interno actualizar la moto:',
      error.message
    );
    return NextResponse.json(
      { message: 'Error interno actualizando la moto' },
      { status: 500 }
    );
  }
}
