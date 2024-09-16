import { NextResponse } from 'next/server';
import { createUser, connectDB } from '@/models/test';
import { seedUsers } from '@/db/seed';
import { getDataByDni } from '@/utils/fetchData';
import { getDataByRuc } from '@/utils/fetchData';

export async function GET() {
  try {
    await connectDB();

    // const dni = await getDataByDni('74062106');

    const ruc = await getDataByRuc('20428729201');

    console.log(ruc);

    // await seedUsers();

    // await createUser();
    return NextResponse.json(ruc);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
