import { NextResponse } from 'next/server';
import {
  getAllCategoriesController,
  getCategoriesBySegmentIdController,
  createCategoryController,
} from '@/backend/categorias/infrastructure/controllers';

export async function GET(request) {
  try {
    // Extrae los query parameters de la URL
    const { searchParams } = new URL(request.url);
    const segmentId = searchParams.get('segmentId');

    let result;
    if (segmentId !== null) {
      result = await getCategoriesBySegmentIdController(segmentId);
    } else {
      result = await getAllCategoriesController();
    }

    const { payload, status } = result;

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
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
