import { NextResponse } from 'next/server';
import { connectDB } from '@/db/mongodb';

export async function GET() {
  await connectDB();
  return NextResponse.json([]);
}

export async function POST() {
  return NextResponse.json({ message: 'API WORKING' });
}
