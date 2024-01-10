import { fetchData } from '@/lib/fetchData';
import { getProductByIdUrl } from '@/lib/urls';

export async function getProductByIdRequest(id) {
  try {
    const url = `${getProductByIdUrl}/${id}`;
    const response = await fetchData(url);
    if (response?.status !== 200) {
      console.log('Error al obtener el producto desde el cliente');
      return { product: null, status: 500 };
    }
    const product = response?.data?.payload;
    return { product, status: 200 };
  } catch (error) {
    // console.log(error);
  }
}
