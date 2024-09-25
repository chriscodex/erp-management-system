import { NextResponse } from 'next/server';
import { getUserDataByDniController } from '@/backend/searchedUsers/infrastructure/controllers';

export async function GET(request) {
  try {
    const dni = request.nextUrl.searchParams.get('number');

    const { payload, status } = await getUserDataByDniController(dni);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status: 400 });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
