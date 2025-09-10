import { NextResponse } from 'next/server';
import { updateNotificacionController } from '@/backend/notificaciones/infrastructure/controllers';

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await updateNotificacionController(
      request,
      contextRoute,
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Notificacion Route: Error interno al remover la notificacion: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno al remover la notificacion' },
      { status: 500 },
    );
  }
}
