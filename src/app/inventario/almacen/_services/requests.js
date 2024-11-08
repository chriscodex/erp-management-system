import { fetchData } from '@/lib/fetchData';
import { getAllAlmacenesServerUrl } from '@/lib/urls';

export async function getAllAlmacenesRequest() {
  try {
    const response = await fetchData(getAllAlmacenesServerUrl);
    if (response?.status !== 200) {
      console.log('Error al obtener todos los almacenes');
      return { almacenes: [], status: 500 };
    }
    const almacenes = response?.data?.payload;
    return { almacenes, status: 200 };
  } catch (error) {
    console.error(error);
  }
}
