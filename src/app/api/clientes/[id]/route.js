import { NextResponse } from 'next/server';
import { getClienteByDataController, updateClienteController, deleteClienteController} from '@/backend/clientes/infrastructure/controllers';

export async function GET(_, contextRoute) {
  try {
    const { payload, status } = await getClienteByDataController(contextRoute);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Cliente Route: Error interno al obtener el cliente: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno obteniendo el cliente' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await updateClienteController(
      request,
      contextRoute
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Cliente Route: Error interno al actualizar el cliente: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno al actualizar el cliente' },
      { status: 500 }
    );
  }
}

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deleteClienteController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      `Cliente Route: Error interno al eliminar el cliente: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno eliminando el cliente' },
      { status: 500 }
    );
  }
}
