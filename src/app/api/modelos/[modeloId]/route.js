import { deleteModeloController } from '@/backend/modelos/infrastructure/controllers';
import { NextResponse } from 'next/server';

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deleteModeloController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      'Modelo Route: Error interno eliminar un modelo:',
      error.message
    );
    return NextResponse.json(
      { error: 'Error eliminando el modelo' },
      { status: 500 }
    );
  }
}
