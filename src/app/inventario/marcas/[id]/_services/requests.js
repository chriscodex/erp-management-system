import { fetchData } from '@/lib/fetchData';
import { getMarcaUrl } from '@/lib/urls';

export async function getMarca(id) {
  try {
    const url = `${getMarcaUrl}/${id}`;
    const response = await fetchData(url);
    if (response?.status !== 200) {
      console.log('Error al obtener el usuario desde el cliente');
      return { marca: null, status: 500 };
    }
    const marca = response?.data?.payload;
    return { marca, status: 200 };
  } catch (error) {
    console.log(error);
  }
}