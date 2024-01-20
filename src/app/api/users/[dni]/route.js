import { NextResponse } from 'next/server';
import {
  getUserByDataController,
  updateUserController,
  deleteUserController,
} from '@/backend/users/infrastructure/controllers';

export async function GET(_, contextRoute) {
  try {
    const { payload, status } = await getUserByDataController(contextRoute);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Users Route: Error interno al obtener el usuario: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno obteniendo el usuario' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await updateUserController(
      request,
      contextRoute
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Users Route: Error interno al actualizar el usuario: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno al actualizar el usuario' },
      { status: 500 }
    );
  }
}

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deleteUserController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      `Users Route: Error interno al eliminar el usuario: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno eliminando el usuario' },
      { status: 500 }
    );
  }
}
