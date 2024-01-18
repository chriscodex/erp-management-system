import { NextResponse } from 'next/server';
import { getUserDataByDniController } from '@/backend/searchedUsers/infrastructure/controllers';

export async function GET(request) {
  try {
    const { payload, status } = await getUserDataByDniController(request);

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
