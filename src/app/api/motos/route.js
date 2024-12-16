import { createMotoController } from '@/backend/motos/infrastructure/controllers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { payload, status } = await createMotoController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Motos Route: Error interno al crear la moto: ${error.message}`
    );
    return NextResponse.json(
      { error: 'Error interno al crear la moto' },
      { status: 500 }
    );
  }
}
