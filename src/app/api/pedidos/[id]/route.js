import { NextResponse } from 'next/server';

import {
  inventariarPedidoController,
  deletePedidoController,
  updatePedidoController,
  getPedidoByDataController,
} from '@/backend/pedidos/infrastructure/controllers';

export async function GET(_, contextRoute) {
  try {
    const { payload, status } = await getPedidoByDataController(contextRoute);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error obteniendo el pedido' },
      { status: 500 },
    );
  }
}

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await updatePedidoController(
      request,
      contextRoute,
    );
    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Pedido Route: Error interno al actualizar el producto: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno al actualizar el producto' },
      { status: 500 },
    );
  }
}

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deletePedidoController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      'Pedidos Route: Error interno eliminar un pedido',
      error.message,
    );
    return NextResponse.json(
      { error: 'Error eliminando el pedido' },
      { status: 500 },
    );
  }
}

export async function POST(request, { params }) {
  try {
    const pedidoId = params.id; // <- viene de la URL
    const { payload, status } = await inventariarPedidoController({
      id: pedidoId,
    });

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Pedidos Route: Error interno al inventariar el pedido: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno al inventariar el pedido' },
      { status: 500 },
    );
  }
}
