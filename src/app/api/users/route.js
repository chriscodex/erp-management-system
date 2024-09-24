import { NextResponse } from 'next/server';
import { createUserController, getAllUsersController } from '@/backend/users/infrastructure/controllers';

export async function GET() {
  try {
    const { payload, status } = await getAllUsersController();

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching users' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { payload, status } = await createUserController(body);

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
