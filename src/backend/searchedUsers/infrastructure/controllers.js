import { getDataByDniFromApi } from '@/backend/searchedUsers/infrastructure/externalApi';

export async function getUserDataByDniController(dni) {
  try {
    const userData = await getDataByDniFromApi(dni);
    return userData
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Internal Server Error');
  }
}