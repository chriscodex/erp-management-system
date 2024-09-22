import { NextResponse } from 'next/server';
import { getUserDataByDniController } from '@/backend/searchedUsers/infrastructure/controllers';

export async function GET(request) {
  try {
    const dni = request.nextUrl.searchParams.get('number');
    const userData = await getUserDataByDniController(dni);
    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
