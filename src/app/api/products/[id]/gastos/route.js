import { NextResponse } from 'next/server';
import { createGastoController } from '@/backend/products/infrastructure/controllers';

export async function POST(request, contextRoute) {
  try {
    const { payload, status } = await createGastoController(
      request,
      contextRoute,
    );

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Products Route: Error interno al crear el gasto: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno al crear el gasto' },
      { status: 500 },
    );
  }
}
