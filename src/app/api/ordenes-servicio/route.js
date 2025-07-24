import { NextResponse } from 'next/server';
import {
  // getOrdenesDeServicioController,
  createOrdenDeServicioController,
} from '@/backend/ordenesServicio/infrastructure/controllers';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { payload, status } = await createOrdenDeServicioController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Ordenes de Servicio Route: Error interno al crear la orden de servicio: ${error.message}`
    );
    return NextResponse.json(
      { error: 'Error interno al crear la orden de servicio' },
      { status: 500 }
    );
  }
}
