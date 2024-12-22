import { NextResponse } from 'next/server';

import {
  deleteSingleUnitFromProductController,
  updateUnitProductController,
} from '@/backend/products/infrastructure/controllers';

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await updateUnitProductController(
      request,
      contextRoute
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Unit Product Route: Error interno al actualizar el unitProduct: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno al actualizar el unitProduct' },
      { status: 500 }
    );
  }
}

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deleteSingleUnitFromProductController(
      contextRoute
    );

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      `Unit Product Route: Error interno al eliminar el unitProduct: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno al eliminar el unitProduct' },
      { status: 500 }
    );
  }
}
