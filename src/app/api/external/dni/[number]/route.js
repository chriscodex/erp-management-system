import { NextResponse } from 'next/server';
import { getDataByDniFromApi } from '@/lib/fetchData';

export async function GET(request, { params }) {
  try {
    console.log(params);
    const dni = await getDataByDniFromApi(params.number);
    return NextResponse.json(dni);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
