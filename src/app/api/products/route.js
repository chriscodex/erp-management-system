import { NextResponse } from 'next/server';

import { getAllProductsController } from '@/backend/products/infrastructure/controllers';

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
