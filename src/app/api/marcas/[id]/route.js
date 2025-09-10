import { NextResponse } from 'next/server';
import {
  getMarcaController,
  updateMarcaController,
  deleteMarcaController,
} from '@/backend/marcas/infrastructure/controllers';

export async function GET(_, contextRoute) {
  try {
    const { payload, status } = await getMarcaController(contextRoute);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Marcas Route: Error interno al obtener la marca: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno obteniendo la marca' },
      { status: 500 },
    );
  }
}

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await updateMarcaController(
      request,
      contextRoute,
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Marcas Route: Error interno al actualizar la marca: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno actualizando la marca' },
      { status: 500 },
    );
  }
}

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deleteMarcaController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      `Marcas Route: Error interno al eliminar la marca: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno eliminando la marca' },
      { status: 500 },
    );
  }
}
