import { fetchData } from '@/lib/fetchData';

export async function getUser(dni) {
  try {
    const getUserUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/${dni}`;
    const response = await fetchData(getUserUrl);
    if (response?.status !== 200) {
      console.log('Error al obtener el usuario desde el cliente');
      return { user: null, status: 500 };
    }
    const user = response?.data?.payload;
    return { user, status: 200 };
  } catch (error) {
    console.log(error);
  }
}