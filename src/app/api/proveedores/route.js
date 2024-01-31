import { NextResponse } from 'next/server';

import { getProveedoresController } from '@/backend/proveedores/infrastructure/controller';

export async function GET() {
  try {
    const { payload, status } = await getProveedoresController();

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Proveedores Route: Error interno al obtener los proveedores: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno al obtener los proveedores' },
      { status: 500 }
    );
  }
}
