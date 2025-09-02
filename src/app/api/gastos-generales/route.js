import { NextResponse } from 'next/server';
import {
  getGastosGeneralesController,
  createGastoGeneralController,
} from '@/backend/gastosGenerales/infrastructure/controller';

export async function GET() {
  try {
    const { payload, status } = await getGastosGeneralesController();

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Gastos Generales Route: Error interno al obtener los gastos generales: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error obteniendo los gastos generales' },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const { payload, status } = await createGastoGeneralController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Gastos Generales Route: Error interno al crear el gasto general: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno al crear el gasto general' },
      { status: 500 },
    );
  }
}
