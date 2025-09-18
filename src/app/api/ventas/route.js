import { createVentaController } from '@/backend/ventas/infrastructure/controllers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { payload, status } = await createVentaController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Ventas Route: Error interno al crear la venta: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno al crear la venta' },
      { status: 500 },
    );
  }
}
