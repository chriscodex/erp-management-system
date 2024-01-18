import { NextResponse } from 'next/server';
import {
  deleteCategoryController,
  updateCategoryController,
} from '@/backend/categorias/infrastructure/controllers';

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deleteCategoryController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      'Categorias Route: Error interno eliminar la categoría:',
      error.message
    );
    return NextResponse.json(
      { message: 'Error eliminando la categoría' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await updateCategoryController(
      request,
      contextRoute
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      'Categorias Route: Error interno actualizar la categoría:',
      error.message
    );
    return NextResponse.json(
      { message: 'Error actualizando la categoría' },
      { status: 500 }
    );
  }
}
