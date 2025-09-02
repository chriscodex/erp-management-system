import { NextResponse } from 'next/server';

import {
  getMarcasController,
  createMarcaController,
} from '@/backend/marcas/infrastructure/controllers';

export async function GET(request) {
  try {
    const result = await getMarcasController(request);

    const { payload, status } = result;

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Marcas Route: Error interno al obtener todas las marcas: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno obteniendo todas las marcas' },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const { payload, status } = await createMarcaController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Marcas Route: Error interno al crear la marca: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno al crear la marca' },
      { status: 500 },
    );
  }
}
