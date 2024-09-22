import { NextResponse } from 'next/server';
import { getSearchedUserController } from '@/backend/searchedUsers/infrastructure/controllers';

export async function GET(request) {
  try {
    const dni = request.nextUrl.searchParams.get('dni');
    const searchedUserData = await getSearchedUserController(dni);
    return NextResponse.json(searchedUserData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}