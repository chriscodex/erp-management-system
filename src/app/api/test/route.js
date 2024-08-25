import { NextResponse } from 'next/server';
import { createUser, connectDB } from '@/models/test';

export async function GET() {
  await connectDB();

  await createUser();
  return NextResponse.json({ message: 'API WORKING' });
}