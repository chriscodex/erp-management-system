import { NextResponse } from 'next/server';
import {
  getReservacionByDataController,
  updateReservacionController,
  deleteReservacionController,
} from '@/backend/reservaciones/infrastructure/controllers';

export async function GET(_, contextRoute) {
  try {
    const { payload, status } =
      await getReservacionByDataController(contextRoute);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Reservacion Route: Error interno al obtener la reservación: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno obteniendo la reservación' },
      { status: 500 },
    );
  }
}

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await updateReservacionController(
      request,
      contextRoute,
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Reservacion Route: Error interno al actualizar la reservación: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno al actualizar la reservación' },
      { status: 500 },
    );
  }
}

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deleteReservacionController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      `Reservacion Route: Error interno al eliminar la reservación: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno eliminando la reservación' },
      { status: 500 },
    );
  }
}
