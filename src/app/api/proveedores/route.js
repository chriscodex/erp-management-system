import { NextResponse } from 'next/server';

import { getAllProveedoresController } from '@/backend/proveedores/infrastructure/controller';

export async function GET() {
  try {
    const { payload, status } = await getAllProveedoresController();

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error obteniendo los proveedores' },
      { status: 500 }
    );
  }
}
