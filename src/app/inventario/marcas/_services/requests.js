import { getAllMarcasUrl } from '@/lib/urls';
import { fetchData } from '@/lib/fetchData';

export async function getAllMarcas() {
  try {
    const response = await fetchData(getAllMarcasUrl);
    if (response?.status !== 200) {
      console.log('Error al obtener todas las marcas');
      return { marcas: [], status: 500 };
    }
    const marcas = response?.data?.payload;
    return { marcas, status: 200 };
  } catch (error) {
    console.error(error);
  }
}