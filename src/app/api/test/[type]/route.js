import { NextResponse } from 'next/server';
import { getDataByDniTest, seedTest } from '@/lib/pruebas';

export async function GET(request, { params }) {
  try {
    switch (params.type) {
      case 'seed':
        const seed = await seedTest();
        return NextResponse.json(seed);

      case 'dni':
        const dni = await getDataByDniTest();
        return NextResponse.json(dni);

      case 'ruc':
        // const ruc = await getDataByRucTest();
        // return NextResponse.json(ruc);

      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
