import { enviarBoletaASunatController } from '@/backend/ventas/infrastructure/controllers';
import { NextResponse } from 'next/server';

export async function POST(_request, contextRoute) {
  try {
    const { payload, status } = await enviarBoletaASunatController(contextRoute);
    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error('API: Error al enviar boleta a Sunat:', error.message);
    return NextResponse.json({ error: 'Error interno enviando boleta a Sunat' }, { status: 500 });
  }
} 