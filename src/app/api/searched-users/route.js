import { NextResponse } from 'next/server';

import { getSearchedUserController } from '@/backend/searchedUsers/infrastructure/controllers';

export async function GET(request) {
  try {
    const { payload, status } = await getSearchedUserController(request);

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
