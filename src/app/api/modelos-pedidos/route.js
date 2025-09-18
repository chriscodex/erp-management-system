import { createModeloPedidoController } from '@/backend/modelosPedidos/infrastructure/controllers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { payload, status } = await createModeloPedidoController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Modelo Pedido Route: Error interno al crear el modelo: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno al crear el modelo' },
      { status: 500 },
    );
  }
}
