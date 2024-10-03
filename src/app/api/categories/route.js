import { NextResponse } from 'next/server';
import { getAllCategoriesController } from '@/backend/categorias/infrastructure/controllers';

export async function GET() {
  try {
    const { payload, status } = await getAllCategoriesController();

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching users' },
      { status: 500 }
    );
  }
}
