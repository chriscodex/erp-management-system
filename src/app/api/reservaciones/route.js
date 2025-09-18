import { NextResponse } from 'next/server';
import {
  getReservacionesController,
  createReservacionController,
} from '@/backend/reservaciones/infrastructure/controllers';

export async function GET() {
  try {
    const { payload, status } = await getReservacionesController();

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Reservacion Route: Error interno al obtener las reservaciones: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error obteniendo las reservaciones' },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const { payload, status } = await createReservacionController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Reservacion Route: Error interno al crear la reservación: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno al crear la reservación' },
      { status: 500 },
    );
  }
}
