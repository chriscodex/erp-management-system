import { NextResponse } from 'next/server';
import {
  getUsersController,
  createUserController,
} from '@/backend/users/infrastructure/controllers';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { payload, status } = await getUsersController(request);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Users Route: Error interno al obtener los usuarios: ${error.message}`,
    );
    return NextResponse.json(
      { message: 'Error obteniendo los usuarios' },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const { payload, status } = await createUserController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Users Route: Error interno al crear el usuario: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno al crear el usuario' },
      { status: 500 },
    );
  }
}
