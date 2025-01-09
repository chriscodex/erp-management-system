import { NextResponse } from 'next/server';
import {
  deletePreventaController,
} from '@/backend/preventas/infrastructure/controllers';

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deletePreventaController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      `Preventas Route: Error interno al eliminar la preventa: ${error.message}`
    );
    return NextResponse.json(
      { error: 'Error interno eliminando la preventa' },
      { status: 500 }
    );
  }
}