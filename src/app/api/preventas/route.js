import { createPreventaController } from '@/backend/preventas/infrastructure/controllers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { payload, status } = await createPreventaController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Preventas Route: Error interno al crear la preventa: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno al crear la preventa' },
      { status: 500 },
    );
  }
}
