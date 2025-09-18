import { NextResponse } from 'next/server';
import { getNotificacionesController } from '@/backend/notificaciones/infrastructure/controllers';

export async function GET() {
  try {
    const { payload, status } = await getNotificacionesController();

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Notificaciones Route: Error interno al obtener las notificaciones: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error obteniendo las notificaciones' },
      { status: 500 },
    );
  }
}
