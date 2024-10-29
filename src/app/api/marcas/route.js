import { NextResponse } from 'next/server';

import {
  getAllMarcasController,
  getMarcasBySegmentIdController,
  createMarcaController,
} from '@/backend/marcas/infrastructure/controllers';

export async function GET(request) {
  try {
    // Extrae los query parameters de la URL
    const { searchParams } = new URL(request.url);
    const segmentId = searchParams.get('segmentId');

    let result;
    if (segmentId !== null) {
      result = await getMarcasBySegmentIdController(segmentId);
    } else {
      result = await getAllMarcasController();
    }

    const { payload, status } = result;

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Marcas Route: Error interno al obtener todas las marcas: ${error.message}`
    );
    return NextResponse.json(
      { error: 'Error obteniendo todas las marcas' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { payload, status } = await createMarcaController(body);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Marcas Route: Error interno al crear la marca: ${error.message}`
    );
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
