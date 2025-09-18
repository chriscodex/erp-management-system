import { NextResponse } from 'next/server';
import {
  getGastoGeneralByDataController,
  updateGastoGeneralController,
  deleteGastoGeneralController,
} from '@/backend/gastosGenerales/infrastructure/controller';

export async function GET(_, contextRoute) {
  try {
    const { payload, status } =
      await getGastoGeneralByDataController(contextRoute);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Gastos Generales Route: Error interno al obtener el gasto general: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno obteniendo el gasto general' },
      { status: 500 },
    );
  }
}

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await updateGastoGeneralController(
      request,
      contextRoute,
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Gastos Generales Route: Error interno al actualizar el gasto general: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno al actualizar el gasto general' },
      { status: 500 },
    );
  }
}

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } =
      await deleteGastoGeneralController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      `Gastos Generales Route: Error interno al eliminar el gasto general: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error interno eliminando el gasto general' },
      { status: 500 },
    );
  }
}
