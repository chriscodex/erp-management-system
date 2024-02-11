import { NextResponse } from 'next/server';
import { getUserDataByDniController } from '@/backend/searchedUsers/infrastructure/controllers';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { payload, status } = await getUserDataByDniController(request);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status: 400 });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `ExternalApi Route: Error interno al buscar usuario por DNI: ${error.message}`
    );
    return NextResponse.json(
      { error: 'Error obteniendo los datos de la persona desde la API externa' },
      { status: 500 }
    );
  }
}
