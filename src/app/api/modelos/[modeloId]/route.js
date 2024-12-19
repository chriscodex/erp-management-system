import {
  deleteModeloController,
  updateModeloController,
} from '@/backend/modelos/infrastructure/controllers';
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

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await updateModeloController(
      request,
      contextRoute
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      'Modelo Route: Error interno actualizar el modelo:',
      error.message
    );
    return NextResponse.json(
      { message: 'Error interno actualizando el modelo' },
      { status: 500 }
    );
  }
}
