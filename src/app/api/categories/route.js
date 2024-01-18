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
      `Categorias Route: Error interno al obtener todas las categorias: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error obteniendo todas las categorías' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { payload, status } = await createCategoryController(body);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
