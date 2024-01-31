import { NextResponse } from 'next/server';

import {
  getProductsController,
  createProductController,
} from '@/backend/products/infrastructure/controllers';

export async function GET() {
  try {
    const { payload, status } = await getProductsController();

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Products Route: Error interno al obtener todos los productos: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno obteniendo todos los products' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { payload, status } = await createProductController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Products Route: Error interno al crear el producto: ${error.message}`
    );
    return NextResponse.json(
      { error: 'Error interno al crear el producto' },
      { status: 500 }
    );
  }
}
