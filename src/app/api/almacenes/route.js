import { NextResponse } from 'next/server';

import {
  createAlmacenController,
  getAllAlmacenesController,
} from '@/backend/almacenes/infrastructure/controllers';

export async function GET() {
  try {
    const { payload, status } = await getAllAlmacenesController();

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Almacenes Route: Error interno al obtener todas los almacenes: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno obteniendo los almacenes' },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const { payload, status } = await createAlmacenController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Almacen Route: Error interno al crear el almacen: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno al crear el almacen' },
      { status: 500 },
    );
  }
}
