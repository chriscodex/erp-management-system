import { NextResponse } from 'next/server';
import {
  getAllCategoriesController,
  createCategoryController,
  getCategoriesBySegmentDataController,
} from '@/backend/categorias/infrastructure/controllers';

export async function GET(request) {
  try {
    // Extrae los query parameters de la URL
    const { searchParams } = new URL(request.url);
    const segmentId = searchParams.get('segmentId');
    const segmentName = searchParams.get('segmentName');

    if (segmentId !== null && segmentName !== null) {
      return NextResponse.json(
        {
          error:
            'No se pueden filtrar por segmentId y segmentName al mismo tiempo',
        },
        { status: 400 }
      );
    }

    let result;
    if (segmentId !== null || segmentName !== null) {
      result = await getCategoriesBySegmentDataController({
        id: segmentId,
        nombre: segmentName,
      });
    } else {
      result = await getAllCategoriesController();
    }

    const { payload, status } = result;

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
