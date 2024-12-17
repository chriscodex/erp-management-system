import { NextResponse } from 'next/server';
import { createGastoMotoController } from '@/backend/motos/infrastructure/controllers';

export async function POST(request, contextRoute) {
  try {
    const { payload, status } = await createGastoMotoController(
      request,
      contextRoute
    );

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Gasto Moto Route: Error interno al crear el gasto: ${error.message}`
    );
    return NextResponse.json(
      { error: 'Error interno al crear el gasto' },
      { status: 500 }
    );
  }
}
