import {
  createMotoController,
  getMotoByDataController,
} from '@/backend/motos/infrastructure/controllers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { payload, status } = await createMotoController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Motos Route: Error interno al crear la moto: ${error.message}`
    );
    return NextResponse.json(
      { error: 'Error interno al crear la moto' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { payload, status } = await getMotoByDataController(request);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Motos Route: Error interno al obtener la(s) moto(s): ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno al obtener la(s) moto(s)' },
      { status: 500 }
    );
  }
}
