import { NextResponse } from 'next/server';
import { deleteCategoryController } from '@/backend/categorias/infrastructure/controllers';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const { payload, status } = await deleteCategoryController(id);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error eliminando la categoría' },
      { status: 500 }
    );
  }
}
