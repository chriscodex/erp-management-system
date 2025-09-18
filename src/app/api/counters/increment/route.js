// route.js en /counter/increment
import { NextResponse } from 'next/server';
import { aumentarContadorByType } from '@/backend/counters/infrastructure/controllers';

export const dynamic = 'force-dynamic';

export async function PATCH(request) {
  try {
    const { payload, status } = await aumentarContadorByType(request);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Counter Route: Error interno al incrementar el counter: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno incrementando el counter' },
      { status: 500 },
    );
  }
}
