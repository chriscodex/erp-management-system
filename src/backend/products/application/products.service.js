import { ProductRepository } from '@/backend/products/domain/repositories/productRepository';

export class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts() {
    try {
      const products = await this.productRepository.getAllProducts();

      if (!products) {
        console.log('Product Service: No se encontraron productos');
        return {
          status: 404,
          payload: 'No se encontraron productos',
        };
      }

      console.log('Product Service: Productos encontrados');
      return {
        status: 200,
        payload: products,
      };
    } catch (error) {
      console.error(
        `Product Service: Error interno al buscar todos los productos: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
