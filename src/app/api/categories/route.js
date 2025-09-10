import { NextResponse } from 'next/server';
import {
  getCategoriesController,
  createCategoryController,
} from '@/backend/categorias/infrastructure/controllers';

export async function GET(request) {
  try {
    const { payload, status } = await getCategoriesController(request);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Categorias Route: Error interno al obtener todas las categorias: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno obteniendo todas las categorías' },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const { payload, status } = await createCategoryController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Categorias Route: Error interno al crear la categoría: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno al crear la categoría' },
      { status: 500 },
    );
  }
}
