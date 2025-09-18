import { NextResponse } from 'next/server';

import {
  getPedidosController,
  createPedidoController,
} from '@/backend/pedidos/infrastructure/controllers';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { payload, status } = await getPedidosController(request);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Pedidos Route: Error interno al obtener todos los pedidos: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno obteniendo todos los pedidos' },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const { payload, status } = await createPedidoController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Pedidos Route: Error interno al crear el pedido: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno al crear el pedido' },
      { status: 500 },
    );
  }
}
