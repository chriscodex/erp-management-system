import { NextResponse } from 'next/server';
import { deleteGastoController } from '@/backend/products/infrastructure/controllers';

export async function DELETE(_, contextRoute) {
  try {
    console.log(contextRoute);
    const { payload, status } = await deleteGastoController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      `Products Route: Error interno buscando el producto: ${error.message}`
    )
    return NextResponse.json(
      { error: 'Error obteniendo el producto' },
      { status: 500 }
    );
  }
}