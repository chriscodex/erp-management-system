import { NextResponse } from 'next/server';

import {
  deleteProveedorController,
  updateProveedorController,
} from '@/backend/proveedores/infrastructure/controller';

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deleteProveedorController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      'Proveedor Route: Error interno al eliminar el proveedor:',
      error.message,
    );
    return NextResponse.json(
      { message: 'Error interno al eliminar el proveedor' },
      { status: 500 },
    );
  }
}

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await updateProveedorController(
      request,
      contextRoute,
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      'Proveedor Route: Error interno actualizar el proveedor:',
      error.message,
    );
    return NextResponse.json(
      { message: 'Error interno actualizando el proveedor' },
      { status: 500 },
    );
  }
}
