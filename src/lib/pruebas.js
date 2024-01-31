
import { getDataByDniFromExternalApi } from '@/backend/shared/externalApi';
import { seed } from '@/db/seed';
import { connectDB } from '@/db/mongodb';

export async function seedTest() {
  try {
    await connectDB();
    await seed();
    return 'Seed test executed successfully';
  } catch (error) {
    console.log('Seed test error:', error);
  }
}

export async function getDataByDniTest() {
  try {
    const dni = await getDataByDniFromExternalApi('74062106');

    return dni;
  } catch (error) {
    console.log('getDataByDniTest error:', error);
  }
}