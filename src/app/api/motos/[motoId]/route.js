import { NextResponse } from 'next/server';

import { deleteMotoController } from '@/backend/motos/infrastructure/controllers';

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
