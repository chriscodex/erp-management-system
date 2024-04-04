import { NextResponse } from 'next/server';

import { updateUnitProductController } from '@/backend/products/infrastructure/controllers';

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
