import { enviarBoletaASunatController } from '@/backend/ventas/infrastructure/controllers';
import { NextResponse } from 'next/server';

export async function POST(request, contextRoute) {
  try {
    const { payload, status } = await enviarBoletaASunatController(request, contextRoute);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error('Ventas Route: Error al enviar boleta a Sunat:', error.message);
    return NextResponse.json(
      { error: 'Error interno enviando boleta a Sunat' },
      { status: 500 }
    );
  }
}
