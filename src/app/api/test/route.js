import { NextResponse } from 'next/server';
import { connectDB } from '@/models/test';
import { seedUsers } from '@/db/seed';
import { getDataByDni } from '@/utils/fetchData';
import { getDataByRuc } from '@/utils/fetchData';

export async function GET() {
  try {
    await connectDB();

    const dni = await getDataByDni('74062106');

    // const ruc = await getDataByRuc('20428729201');

    console.log(dni);

    // await seedUsers();
    return NextResponse.json(dni);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
