import { NextResponse } from 'next/server';
import { connectDB } from '@/db/mongodb';
import { UserService } from '@/users/application/users.service';

const userService = new UserService();

export async function GET() {
  try {
    await connectDB();

    const users = await userService.getAllUsers();

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
