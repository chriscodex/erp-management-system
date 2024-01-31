import { NextResponse } from 'next/server';

import { getProductByDataController } from '@/backend/products/infrastructure/controllers';

export async function GET(_, contextRoute) {
  try {
    const { payload, status } = await getProductByDataController(contextRoute);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error obteniendo el producto' },
      { status: 500 }
    );
  }
}
