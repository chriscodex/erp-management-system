import { NextResponse } from 'next/server';

import { getDataByRucTest } from '@/lib/pruebas';

export async function GET() {
  try {    
    const result = await getDataByRucTest();

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
