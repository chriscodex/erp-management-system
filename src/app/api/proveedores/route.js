import { NextResponse } from 'next/server';

import {
  createProveedorController,
} from '@/backend/proveedores/infrastructure/controller';

export async function POST(request) {
  try {
    const { payload, status } = await createProveedorController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Proveedor Route: Error interno al crear el proveedor: ${error.message}`
    );
    return NextResponse.json(
      { error: 'Error interno al crear el proveedor' },
      { status: 500 }
    );
  }
}
