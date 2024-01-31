import { NextResponse } from 'next/server';

import { getEmpresasController } from '@/backend/empresas/infrastructure/controllers';

export async function GET() {
  try {
    const { payload, status } = await getEmpresasController();

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Empresas Route: Error interno al obtener todas las empresas: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno obteniendo todas las empresas' },
      { status: 500 }
    );
  }
}
