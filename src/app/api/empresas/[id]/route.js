import { NextResponse } from 'next/server';
import {
  getEmpresaByDataController,
  updateEmpresaController,
  deleteEmpresaController,
} from '@/backend/empresas/infrastructure/controllers';

export async function GET(_, contextRoute) {
  try {
    const { payload, status } = await getEmpresaByDataController(contextRoute);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Empresas Route: Error interno al obtener la empresa: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno obteniendo la empresa' },
      { status: 500 },
    );
  }
}

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await updateEmpresaController(
      request,
      contextRoute,
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Empresas Route: Error interno al actualizar la empresa: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno al actualizar la empresa' },
      { status: 500 },
    );
  }
}

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deleteEmpresaController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      `Empresas Route: Error interno al eliminar la empresa: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno eliminando la empresa' },
      { status: 500 },
    );
  }
}
