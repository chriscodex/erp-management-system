import { NextResponse } from 'next/server';

import {
  getAllProductsController,
  createProductController,
} from '@/backend/products/infrastructure/controllers';

export async function GET() {
  try {
    const { payload, status } = await getAllProductsController();

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Products Route: Error interno al obtener todos los productos: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error obteniendo todos los products' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { payload, status } = await createProductController(body);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
