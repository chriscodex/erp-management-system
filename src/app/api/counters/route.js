import { NextResponse } from 'next/server';

import { getCurrentCounterByType } from '@/backend/counters/infrastructure/controllers';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { payload, status } = await getCurrentCounterByType(request);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Counter Route: Error interno al obtener el counter: ${error.message}`
    );
    return NextResponse.json(
      { error: 'Error interno obteniendo el counter' },
      { status: 500 }
    );
  }
}
