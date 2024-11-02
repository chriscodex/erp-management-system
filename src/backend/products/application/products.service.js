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
  async getProductById(id) {
    try {
      const productFound = await this.productRepository.getProductById(id);

      if (!productFound) {
        console.log('Product Service: El producto no existe');
        return {
          status: 404,
          payload: 'El producto no existe',
        };
      }

      console.log('Product Service: El producto existe');
      return {
        status: 200,
        payload: productFound,
      };
    } catch (error) {
      console.error(
        `Product Service: Error interno al buscar el producto: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
