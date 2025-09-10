import { NextResponse } from 'next/server';
import {
  getSucursalByDataController,
  updateSucursalController,
  deleteSucursalController,
} from '@/backend/sucursales/infrastructure/controllers';

export async function GET(_, contextRoute) {
  try {
    const { payload, status } = await getSucursalByDataController(contextRoute);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Sucursales Route: Error interno al obtener la sucursal: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno obteniendo la sucursal' },
      { status: 500 },
    );
  }
}

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await updateSucursalController(
      request,
      contextRoute,
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Sucursales Route: Error interno al actualizar la sucursal: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno al actualizar la sucursal' },
      { status: 500 },
    );
  }
}

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deleteSucursalController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      `Sucursales Route: Error interno al eliminar la sucursal: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno eliminando la sucursal' },
      { status: 500 },
    );
  }
}
