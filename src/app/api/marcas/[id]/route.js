import { NextResponse } from 'next/server';
import {
  getMarcaController,
  deleteMarcaController,
} from '@/backend/marcas/infrastructure/controllers';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { payload, status } = await getMarcaController(id);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error obteniendo la marca' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const { payload, status } = await deleteMarcaController(id);

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
