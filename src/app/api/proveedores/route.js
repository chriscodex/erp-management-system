import { NextResponse } from 'next/server';

import {
  createProveedorController,
  getProveedoresController,
} from '@/backend/proveedores/infrastructure/controller';

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
