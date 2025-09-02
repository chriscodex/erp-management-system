import { enviarFacturaASunatController } from '@/backend/ventas/infrastructure/controllers';
import { NextResponse } from 'next/server';

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await enviarFacturaASunatController(
      request,
      contextRoute,
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      'Ventas Route: Error al enviar factura a Sunat:',
      error.message,
    );
    return NextResponse.json(
      { error: 'Error interno enviando factura a Sunat' },
      { status: 500 },
    );
  }
}
