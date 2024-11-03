import { getAllProductsUrl} from '@/lib/urls';
import { fetchData } from '@/lib/fetchData';

export async function getAllProductsRequest() {
  try {
    const response = await fetchData(getAllProductsUrl);
    if (response?.status !== 200) {
      console.log('Error al obtener todos los productos');
      return { products: [], status: 500 };
    }
    const products = response?.data?.payload;
    return { products, status: 200 };
  } catch (error) {
    console.error(error);
  }
}
