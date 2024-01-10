import { NextResponse } from 'next/server';

import { getProductByDataController } from '@/backend/products/infrastructure/controllers';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { payload, status } = await getProductByDataController({ id });

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
