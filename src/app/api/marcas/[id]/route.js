import { NextResponse } from 'next/server';
import {
  getMarcaController,
  updateMarcaController,
  deleteMarcaController,
} from '@/backend/marcas/infrastructure/controllers';

export async function GET(_, routeContext) {
  try {
    const { payload, status } = await getMarcaController(routeContext);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error obteniendo la marca' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, routeContext) {
  try {
    const { payload, status } = await updateMarcaController(
      request,
      routeContext
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error actualizando la marca' },
      { status: 500 }
    );
  }
}

export async function DELETE(_, routeContext) {
  try {
    const { payload, status } = await deleteMarcaController(routeContext);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error eliminando la marca' },
      { status: 500 }
    );
  }
}
