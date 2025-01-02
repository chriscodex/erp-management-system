import { NextResponse } from 'next/server';

import { getClientByDniOrRucController } from '@/backend/clientes/infrastructure/controllers';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { payload, status } = await getClientByDniOrRucController(request);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Cliente Route: Error interno al obtener el cliente: ${error.message}`
    );
    return NextResponse.json(
      { error: 'Error interno obteniendo el cliente' },
      { status: 500 }
    );
  }
}
