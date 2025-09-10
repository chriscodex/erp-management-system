import { createModeloController } from '@/backend/modelos/infrastructure/controllers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { payload, status } = await createModeloController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Products Route: Error interno al crear el producto: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno al crear el producto' },
      { status: 500 },
    );
  }
}
