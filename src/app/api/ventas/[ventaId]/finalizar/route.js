import { finalizarVentaController } from '@/backend/ventas/infrastructure/controllers';
import { NextResponse } from 'next/server';

export async function POST(_, contextRoute) {
  try {
    const { payload, status } = await finalizarVentaController(contextRoute);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Ventas Route: Error interno al finalizar la venta: ${error.message}`
    );
    return NextResponse.json(
      { error: 'Error interno al finalizar la venta' },
      { status: 500 }
    );
  }
}
