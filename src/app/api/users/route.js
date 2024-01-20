import { NextResponse } from 'next/server';
import {
  getUsersController,
  createUserController,
} from '@/backend/users/infrastructure/controllers';

export async function GET() {
  try {
    const { payload, status } = await getUsersController();

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Users Route: Error interno al obtener los usuarios: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error obteniendo los usuarios' },
      { status: 500 }
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
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
