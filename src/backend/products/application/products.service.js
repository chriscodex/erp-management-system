import { ProductRepository } from '@/backend/products/domain/repositories/productRepository';
import { CategoryRepository } from '@/backend/categorias/domain/repositories/categoryRepository';
import { MarcaRepository } from '@/backend/marcas/domain/repositories/marcaRepository';
import { AlmacenRepository } from '@/backend/almacenes/domain/repositories/almacenRepository';
import { ProveedorRepository } from '@/backend/proveedores/domain/repositories/proveedorRepository';
import { SegmentRepository } from '@/backend/segments/domain/repositories/segmentRepository';
import { createProductSchema } from '@/backend/products/application/validations/createProductSchema';

export class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
    this.categoryRepository = new CategoryRepository();
    this.marcaRepository = new MarcaRepository();
    this.almacenRepository = new AlmacenRepository();
    this.proveedorRepository = new ProveedorRepository();
    this.segmentRepository = new SegmentRepository();
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
  async createProduct(productData) {
    try {
      // Validar los datos del producto enviado con el schema
      const productValidated = createProductSchema.safeParse(productData);

      if (!productValidated.success) {
        console.log(
          `Product Service: Error de validación de schema de producto al crear ${productValidated}`
        );
        return {
          status: 400,
          payload: productValidated.error.issues,
        };
      }

      // Validar si el segmento existe
      const segmentFound = await this.segmentRepository.getSegmentById(
        productData.segmentId
      );
      if (!segmentFound) {
        console.log('Product Service: El segmento no existe');
        return {
          status: 404,
          payload: 'El segmento no existe',
        };
      }
      console.log('Product Service: El segmento existe');

      // Validar si la categoría existe en el segmento
      const categoryExists = await this.categoryRepository.getCategoryByData({
        segmentId: productData.segmentId,
        id: productData.categoryId,
      });
      if (!categoryExists) {
        console.log('Product Service: La categoría no existe en el segmento');
        return {
          status: 404,
          payload: 'El categoría no existe en el segmento',
        };
      }
      console.log('Product Service: La categoría existe en el segmento');

      // Validar si la marca existe en el segmento
      const marcaExists = await this.marcaRepository.getMarcaByData({
        segmentId: productData.segmentId,
        id: productData.marcaId,
      });
      if (!marcaExists) {
        console.log('Product Service: La marca no existe en el segmento');
        return {
          status: 404,
          payload: 'El marca no existe en el segmento',
        };
      }
      console.log('Product Service: La marca existe en el segmento');

      // Validar si el almacen existe
      const almacenFound = await this.almacenRepository.getAlmacenByData({
        id: productData.almacenId,
      });
      if (!almacenFound) {
        console.log('Product Service: El almacen no existe');
        return {
          status: 404,
          payload: 'El almacen no existe',
        };
      }
      console.log('Product Service: El almacen existe');

      // Validar si el proveedor existe
      const proveedorFound = await this.proveedorRepository.getProveedorByData({
        id: productData.proveedorId,
      });
      if (!proveedorFound) {
        console.log('Product Service: El proveedor no existe');
        return {
          status: 404,
          payload: 'El proveedor no existe',
        };
      }
      console.log('Product Service: El proveedor existe');

      // Crear el producto
      const productCreated = await this.productRepository.createProduct(
        productData
      );
      console.log('Product Service: Producto creado correctamente');
      return {
        status: 201,
        payload: productCreated,
      };
    } catch (error) {
      console.error(
        `Product Service: Error interno al crear un producto: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
