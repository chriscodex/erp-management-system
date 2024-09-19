import { getDataByDni, getDataByRuc } from './fetchData';
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
    const dni = await getDataByDni('74062106');

    return dni;
  } catch (error) {
    console.log('getDataByDniTest error:', error);
  }
}


export async function getDataByRucTest() {
  try {
    const ruc = await getDataByRuc('20428729201');

    return ruc;
  } catch (error) {
    console.log('getDataByRucTest error:', error);
  }
}