import { NextResponse } from 'next/server';
import { getUserController } from '@/backend/users/infrastructure/controllers';

export async function GET(request, { params }) {
  try {
    const {dni} = params
    const { payload, status } = await getUserController(dni);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching users' },
      { status: 500 }
    );
  }
}
