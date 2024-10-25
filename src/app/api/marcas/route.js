import { NextResponse } from 'next/server';

import {
  getAllMarcasController,
  createMarcaController,
} from '@/backend/marcas/infrastructure/controllers';

export async function GET() {
  try {
    const { payload, status } = await getAllMarcasController();

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
