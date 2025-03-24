import { NextResponse } from 'next/server';
import {
  getEmpresasController,
  createEmpresaController,
} from '@/backend/empresas/infrastructure/controllers';

export async function GET() {
  try {
    const { payload, status } = await getEmpresasController();

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Empresas Route: Error interno al obtener las empresas: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error obteniendo las empresas' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { payload, status } = await createEmpresaController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Empresa Route: Error interno al crear la empresa: ${error.message}`
    );
    return NextResponse.json(
      { error: 'Error interno al crear la empresa' },
      { status: 500 }
    );
  }
}