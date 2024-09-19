import { NextResponse } from 'next/server';

import { getDataByDniTest } from '@/lib/pruebas';

export async function GET() {
  try {    
    const result = await getDataByDniTest();

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
