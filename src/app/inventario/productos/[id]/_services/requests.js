import { connectDB } from '@/db/mongodb';
import { ProductService } from '@/backend/products/application/products.service';
import { simplificadorParaClientComponent } from '@/lib/utils';

export async function getProductByIdRequest(id) {
  try {
    await connectDB();
    const productService = new ProductService();

    const response = await productService.getProductByData({ id });

    if (response?.status !== 200) {
      console.log('Error al obtener el producto desde el cliente');
      return { product: null, status: 500 };
    }
    const product = response?.payload;
    return { product: simplificadorParaClientComponent(product), status: 200 };
  } catch (error) {
    console.log(error);
  }
}
