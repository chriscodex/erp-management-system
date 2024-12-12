import { NextResponse } from 'next/server';
import { deleteGastoController } from '@/backend/products/infrastructure/controllers';

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deleteGastoController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      `Products Route: Error interno eliminando el producto: ${error.message}`
    )
    return NextResponse.json(
      { error: 'Error interno eliminando el producto' },
      { status: 500 }
    );
  }
}