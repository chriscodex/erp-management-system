import { NextResponse } from 'next/server';
import { connectDB } from '@/db/mongodb';
import { UserApiAdapter } from '@/users/infraestructura/UserApiAdapter';

const userApiAdapter = new UserApiAdapter();

export async function GET() {
  try {
    await connectDB();

    const users = await userApiAdapter.getAllUsers();

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching users' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json({ message: 'API WORKING' });
}
