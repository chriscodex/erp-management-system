import { deleteVentaController } from '@/backend/ventas/infrastructure/controllers';
import { NextResponse } from 'next/server';

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deleteVentaController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      `Ventas Route: Error interno al eliminar la venta: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno eliminando la venta' },
      { status: 500 }
    );
  }
}
