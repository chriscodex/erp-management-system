import { NextResponse } from 'next/server';
import { getSearchedUserController } from '@/backend/searchedUsers/infrastructure/controllers';

export async function GET(request) {
  try {
    const dni = request.nextUrl.searchParams.get('dni');
    const { payload, status } = await getSearchedUserController(dni);

    if (status !== 200) {
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
