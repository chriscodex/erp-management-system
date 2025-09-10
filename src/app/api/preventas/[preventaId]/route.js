import { NextResponse } from 'next/server';
import {
  cancelarPreventaController,
  updatePreventaController,
} from '@/backend/preventas/infrastructure/controllers';

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await cancelarPreventaController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      `Preventas Route: Error interno al eliminar la preventa: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno eliminando la preventa' },
      { status: 500 },
    );
  }
}

export async function PUT(request, contextRoute) {
  try {
    const { payload, status } = await updatePreventaController(
      request,
      contextRoute,
    );

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Preventa Route: Error interno al actualizar la preventa: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno al actualizar la preventa' },
      { status: 500 },
    );
  }
}
