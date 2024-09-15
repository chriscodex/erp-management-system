import { NextResponse } from 'next/server';
import { createUser, connectDB } from '@/models/test';
import { seedUsers } from '@/db/seed';

export async function GET() {
  await connectDB();

  await seedUsers();

  // await createUser();
  return NextResponse.json({ message: 'API WORKING' });
}
