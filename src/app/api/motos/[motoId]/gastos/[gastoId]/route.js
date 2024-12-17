import { NextResponse } from 'next/server';

import {
  deleteGastoMotoController,
  updateGastoMotoController,
} from '@/backend/motos/infrastructure/controllers';

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deleteGastoMotoController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      `GastoMoto Route: Error interno eliminando el gasto de la moto: ${error.message}`
    );
    return NextResponse.json(
      { error: 'Error interno eliminando el gasto de la moto' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await updateGastoMotoController(
      request,
      contextRoute
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `GastoMoto Route: Error interno al actualizar el gasto de la moto: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno al actualizar el gasto de la moto' },
      { status: 500 }
    );
  }
}
