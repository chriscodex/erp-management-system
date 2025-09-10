import { NextResponse } from 'next/server';

import { getSearchedUserController } from '@/backend/searchedUsers/infrastructure/controllers';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { payload, status } = await getSearchedUserController(request);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `SearchedUser Route: Error interno al obtener el searchedUser: ${error.message}`,
    );
    return NextResponse.json(
      { error: 'Error interno obteniedo el searchedUser' },
      { status: 500 },
    );
  }
}
