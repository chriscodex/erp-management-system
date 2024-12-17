import { NextResponse } from 'next/server';
import {
  deleteGastoController,
  updateGastoController,
} from '@/backend/products/infrastructure/controllers';

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deleteGastoController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      `Gasto Route: Error interno eliminando el gasto del producto: ${error.message}`
    );
    return NextResponse.json(
      { error: 'Error interno eliminando el gasto del producto' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await updateGastoController(
      request,
      contextRoute
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Gasto Route: Error interno al actualizar el gasto del producto: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno al actualizar el gasto del producto' },
      { status: 500 }
    );
  }
}
