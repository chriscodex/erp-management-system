import { NextResponse } from 'next/server';

import {
  deleteProductController,
  getProductByDataController,
  updateOrAddOrReduceUnitsToProductController,
} from '@/backend/products/infrastructure/controllers';

export async function GET(_, contextRoute) {
  try {
    const { payload, status } = await getProductByDataController(contextRoute);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error obteniendo el producto' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } =
      await updateOrAddOrReduceUnitsToProductController(request, contextRoute);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Product Route: Error interno al actualizar el producto: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno al actualizar el producto' },
      { status: 500 }
    );
  }
}

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deleteProductController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      'Products Route: Error interno eliminar un producto:',
      error.message
    );
    return NextResponse.json(
      { error: 'Error eliminando el producto' },
      { status: 500 }
    );
  }
}
