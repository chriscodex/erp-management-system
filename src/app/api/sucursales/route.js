import { NextResponse } from 'next/server';
import {
  getSucursalesController,
  createSucursalController,
} from '@/backend/sucursales/infrastructure/controllers';

export async function GET() {
  try {
    const { payload, status } = await getSucursalesController();

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Sucursales Route: Error interno al obtener las sucursales: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error obteniendo las sucursales' },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const { payload, status } = await createSucursalController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `SucursaleS Route: Error interno al crear la sucursal: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno al crear la sucursal' },
      { status: 500 },
    );
  }
}
