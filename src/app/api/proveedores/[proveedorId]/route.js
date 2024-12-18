import { NextResponse } from 'next/server';

import { deleteProveedorController } from '@/backend/proveedores/infrastructure/controller';

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
      error.message
    );
    return NextResponse.json(
      { message: 'Error interno al eliminar el proveedor' },
      { status: 500 }
    );
  }
}
