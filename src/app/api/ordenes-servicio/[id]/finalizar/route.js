import { finalizarOrdenDeServicioController } from '@/backend/ordenesServicio/infrastructure/controllers';
import { NextResponse } from 'next/server';

export async function POST(_, contextRoute) {
  try {
    const { payload, status } =
      await finalizarOrdenDeServicioController(contextRoute);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Orden de Servicio Route: Error interno al finalizar la orden de servicio: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno al finalizar la orden de servicio' },
      { status: 500 },
    );
  }
}
