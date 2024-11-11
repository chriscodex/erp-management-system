import { ProductRepository } from '@/backend/products/domain/repositories/productRepository';
import { CategoryRepository } from '@/backend/categorias/domain/repositories/categoryRepository';
import { MarcaRepository } from '@/backend/marcas/domain/repositories/marcaRepository';
import { AlmacenRepository } from '@/backend/almacenes/domain/repositories/almacenRepository';
import { ProveedorRepository } from '@/backend/proveedores/domain/repositories/proveedorRepository';
import { SegmentRepository } from '@/backend/segments/domain/repositories/segmentRepository';

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
      // Validar los datos de la marca enviada con el schema
      const productValidated = createMarcaSchema.safeParse(productData);

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

      // Validar si la categoría existe
      const marcaFound = await this.segmentRepository.getSegmentById(
        productData.segmentId
      );
      if (!segmentFound) {
        console.log('Product Service: El segmento no existe');
        return {
          status: 404,
          payload: 'El segmento no existe',
        };
      }

      // Validar si una marca con ese nombre y en el mismo segmento ya existe
      const marcaFound = await this.marcaRepository.getMarcaByData(marca);
      if (marcaFound) {
        console.log('Marca Service: La marca ya existe en este segmento');
        return {
          status: 409,
          payload: 'La marca ya existe en este segmento',
        };
      }

      // Crear el objeto de marca que será guardado en la base de datos
      const marcaObject = {
        ...marca,
        estado: 'activo',
      };

      // Crear la marca
      const marcaCreated = await this.marcaRepository.createMarca(marcaObject);

      console.log('Marca Service: Marca creada correctamente');
      return {
        status: 201,
        payload: marcaCreated,
      };
    } catch (error) {
      console.error(
        `Marca Service: Error interno al crear una marca: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
