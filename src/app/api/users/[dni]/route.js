import { NextResponse } from 'next/server';
import {
  getUserByDataController,
  updateUserController,
  deleteUserController,
} from '@/backend/users/infrastructure/controllers';

export async function GET(request, { params }) {
  try {
    const { dni } = params;
    const { payload, status } = await getUserByDataController({ dni });

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error obteniendo el usuario' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { dni } = params;
    const body = await request.json();
    const { payload, status } = await updateUserController(dni, body);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error actualizando el usuario' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { dni } = params;
    const { payload, status } = await deleteUserController(dni);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error eliminando el usuario' },
      { status: 500 }
    );
  }
}
