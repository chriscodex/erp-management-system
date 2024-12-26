import {
  generarUnidadesDelProducto,
} from '@/backend/products/application/helpers';

import { ProductRepository } from '@/backend/products/domain/repositories/productRepository';
import { CategoryRepository } from '@/backend/categorias/domain/repositories/categoryRepository';
import { MarcaRepository } from '@/backend/marcas/domain/repositories/marcaRepository';
import { AlmacenRepository } from '@/backend/almacenes/domain/repositories/almacenRepository';
import { ProveedorRepository } from '@/backend/proveedores/domain/repositories/proveedorRepository';
import { SegmentRepository } from '@/backend/segments/domain/repositories/segmentRepository';
import { GastoRepository } from '@/backend/products/domain/repositories/gastoRepository';

import { createProductSchema } from '@/backend/products/application/validations/createProductSchema';
import { updateUnitProductSchema } from '@/backend/products/application/validations/updateUnitProductSchema';
import { generarNumeroAleatorio } from '@/lib/utils';
import { updateProductSchema } from '@/backend/products/application/validations/updateProductSchema';

export class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
    this.categoryRepository = new CategoryRepository();
    this.marcaRepository = new MarcaRepository();
    this.almacenRepository = new AlmacenRepository();
    this.proveedorRepository = new ProveedorRepository();
    this.segmentRepository = new SegmentRepository();
    this.gastoRepository = new GastoRepository();
  }

  async getAllProducts() {
    try {
      const products = await this.productRepository.getAllProducts();

      if (products?.length === 0) {
        console.log('Product Service: No se encontraron productos');
        return {
          status: 200,
          payload: [],
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
  async countAllProducts() {
    try {
      const totalProducts = await this.productRepository.countAllProducts();

      console.log('Product Service: Productos contados');
      return {
        status: 200,
        payload: totalProducts,
      };
    } catch (error) {
      console.error(
        `Product Service: Error interno al contar todos los productos: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getAllProductsByData(productData) {
    try {
      const productFound = await this.productRepository.getAllProductsByData(
        productData
      );

      if (!productFound) {
        console.log('Product Service: Ningún producto coincide con los datos');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Product Service: Los productos existen');
      return {
        status: 200,
        payload: productFound,
      };
    } catch (error) {
      console.error(
        `Product Service: Error interno al buscar los productos: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getProductByData(productData) {
    try {
      const productFound = await this.productRepository.getProductByData(
        productData
      );

      if (!productFound) {
        console.log('Product Service: El producto no existe');
        return {
          status: 200,
          payload: null,
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

      // Validar si un producto con ese nombre y en el mismo segmento ya existe
      const productFound = await this.productRepository.getProductByData(
        productData
      );
      if (productFound) {
        console.log(
          'Product Service: Un producto con el mismo nombre ya existe'
        );
        return {
          status: 409,
          payload: 'Un producto con el mismo nombre ya existe',
        };
      }
      console.log('Product Service: No hay duplicados');

      // Validar si el segmento existe
      const segmentFound = await this.segmentRepository.getSegmentByData({
        id: productData.segmentId,
      });
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

      // Generar las unidades del producto
      const stock = productData.stock;
      const unidades = await generarUnidadesDelProducto(parseInt(stock));

      const productObject = {
        ...productData,
        estado: 'activo',
        unidades,
      };
      // Crear el producto
      const productCreated = await this.productRepository.createProduct(
        productObject
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
  async updateProduct(productId, productData) {
    try {
      if (!productId) {
        console.log('Product Service: ProductId no enviado');
        return {
          status: 400,
          payload: 'ProductId no enviado',
        };
      }
      // Validar los datos del usuario enviado con el schema
      const productValidated = updateProductSchema.safeParse(productData);

      if (!productValidated.success) {
        console.log(
          'Product Service: Error de validación de schema de producto al actualizar'
        );
        return {
          status: 400,
          payload: productValidated.error.issues,
        };
      }

      // Validar si un producto con ese nombre y en el mismo segmento ya existe
      if (productData.nombre) {
        const productFound = await this.productRepository.getProductByData({
          nombre: productData.nombre,
        });
        if (productFound && productFound?._id !== productId) {
          console.log(
            'Product Service: Un producto con el mismo nombre ya existe'
          );
          return {
            status: 409,
            payload: 'Un producto con el mismo nombre ya existe',
          };
        }
      }

      const productUpdated = await this.productRepository.updateProduct(
        productId,
        productData
      );

      if (!productUpdated) {
        console.log('Product Service: El producto no existe');
        return {
          status: 404,
          payload: 'El producto no existe',
        };
      }

      console.log('Product Service: Producto actualizado correctamente');
      return {
        status: 200,
        payload: productUpdated,
      };
    } catch (error) {
      console.error(
        `Product Service: Error interno al actualizar un producto: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deleteProduct(productId) {
    try {
      const productDeleted = await this.productRepository.deleteProduct(
        productId
      );

      if (!productDeleted) {
        console.log(
          'Product Service: Producto no encontrado para ser eliminado'
        );
        return {
          status: 404,
          payload: 'El producto no existe',
        };
      }

      console.log('Product Service: Producto eliminado correctamente');
      return {
        status: 204,
        payload: productDeleted,
      };
    } catch (error) {
      console.error(
        `Product Service: Error interno al eliminar el producto: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async updateUnitProduct(unitProductId, unitProductData) {
    try {
      const unitProductForValidation = {
        unitProductId,
        ...unitProductData,
      };
      // Validar los datos del unitProduct enviado con el schema
      const productValidated = updateUnitProductSchema.safeParse(
        unitProductForValidation
      );

      if (!productValidated.success) {
        console.log(
          `Product Service: Error de validación de schema de producto al actualizar ${productValidated}`
        );
        return {
          status: 400,
          payload: productValidated.error.issues,
        };
      }

      const unitProductUpdated = await this.productRepository.updateUnitProduct(
        unitProductId,
        unitProductData
      );

      if (!unitProductUpdated) {
        console.log(
          'Product Service: UnitProduct no encontrado para actualizar'
        );
        return {
          status: 404,
          payload: 'UnitProduct no encontrado para actualizar',
        };
      }

      console.log('Product Service: UnitProduct actualizado correctamente');
      return {
        status: 200,
        payload: unitProductUpdated,
      };
    } catch (error) {
      console.error(
        `Product Service: Error interno al actualizar el unitProduct: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async addUnitsToProduct(productId, { cantidadAAgregar }) {
    try {
      // Validación de la cantidad
      if (
        cantidadAAgregar <= 0 ||
        isNaN(cantidadAAgregar) ||
        !Number.isInteger(cantidadAAgregar)
      ) {
        console.log(
          'Product Service: La cantidad de unidades debe ser un número entero mayor que 0'
        );
        return {
          status: 400,
          payload:
            'La cantidad de unidades debe ser un número entero mayor que 0',
        };
      }

      // Validación del ID del producto
      if (!productId) {
        console.log('Product Service: El ID del producto es inválido');
        return {
          status: 400,
          payload: 'El ID del producto debe ser válido y tener 24 caracteres',
        };
      }

      // Comprobar que el producto existe
      const productFound = await this.productRepository.getProductByData({
        id: productId,
      });
      if (!productFound) {
        console.log('Product Service: Producto no encontrado');
        return {
          status: 404,
          payload: 'El producto no existe',
        };
      }

      // Generar las unidades a agregar
      const nuevasUnidades = [];
      for (let i = 0; i < cantidadAAgregar; i++) {
        const nuevoCodigo = `2${generarNumeroAleatorio(12)}`;
        nuevasUnidades.push({ code: nuevoCodigo, estado: 'disponible' });
      }

      // Llamar al repositorio para actualizar el producto
      const productUpdated = await this.productRepository.addUnitsToProduct(
        productId,
        nuevasUnidades,
        cantidadAAgregar
      );
      console.log('Product Service: Unidades agregadas correctamente');
      return {
        status: 201,
        payload: productUpdated,
      };
    } catch (error) {
      console.error(
        `Product Service: Error interno al agregar unidades: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async removeUnitsToProduct(productId, { cantidadADisminuir }) {
    try {
      // Validación de la cantidad
      if (
        cantidadADisminuir <= 0 ||
        isNaN(cantidadADisminuir) ||
        !Number.isInteger(cantidadADisminuir)
      ) {
        console.log(
          'Product Service: La cantidad de unidades a eliminar debe ser un número entero mayor que 0'
        );
        return {
          status: 400,
          payload:
            'La cantidad de unidades a eliminar debe ser un número entero mayor que 0',
        };
      }

      // Validación del ID del producto
      if (!productId) {
        console.log('Product Service: El ID del producto es inválido');
        return {
          status: 400,
          payload: 'El ID del producto debe ser válido y tener 24 caracteres',
        };
      }

      // Verificar si el producto existe
      const productFound = await this.productRepository.getProductByData({
        id: productId,
      });
      if (!productFound) {
        console.log('Product Service: Producto no encontrado');
        return {
          status: 404,
          payload: 'El producto no existe',
        };
      }

      // Verificar si hay suficiente stock para eliminar
      if (productFound?.unidades?.length < cantidadADisminuir) {
        console.log(
          `Product Service: Stock insuficiente para eliminar. Stock actual: ${productFound?.unidades?.length}`
        );
        return {
          status: 400,
          payload: `No hay suficientes unidades para eliminar. Stock actual: ${productFound?.unidades?.length}`,
        };
      }

      // Llamar al repositorio para eliminar las unidades
      const productUpdated = await this.productRepository.removeUnitsToProduct(
        productId,
        cantidadADisminuir
      );
      console.log('Product Service: Unidades disminuidas correctamente');
      return {
        status: 201,
        payload: productUpdated,
      };
    } catch (error) {
      console.error(
        `Product Service: Error interno al disminuir unidades: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deleteSingleUnitFromProduct(productId, unitId) {
    try {
      // Validación del unitId
      if (!unitId) {
        console.log('Product Service: El ID de la unidad es inválido');
        return {
          status: 400,
          payload: 'El ID de la unidad debe ser válido',
        };
      }

      // Verificar si el producto existe
      const productFound = await this.productRepository.getProductByData({
        id: productId,
      });
      if (!productFound) {
        console.log('Product Service: Producto no encontrado');
        return {
          status: 404,
          payload: 'El producto no existe',
        };
      }

      // Llamar al repositorio para eliminar la unidad
      const productUpdated =
        await this.productRepository.deleteSingleUnitFromProduct(
          productId,
          unitId
        );
      console.log('Product Service: Unidad eliminada correctamente');
      return {
        status: 204,
        payload: productUpdated,
      };
    } catch (error) {
      console.error(
        `Product Service: Error al eliminar la unidad: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async createGasto(gastoData, productId) {
    try {
      const gastoCreated = await this.gastoRepository.createGasto(
        gastoData,
        productId
      );

      if (!gastoCreated) {
        console.log(
          'Product Service: Producto no encontrado para agregar gasto'
        );
        return {
          status: 404,
          payload: 'Producto no encontrado para agregar gasto',
        };
      }

      console.log('Product Service: Gasto agregado correctamente');
      return {
        status: 201,
        payload: gastoCreated,
      };
    } catch (error) {
      console.error(
        `Product Service: Error interno al agregar un gasto al producto: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deleteGasto(gastoId, productId) {
    try {
      const gastoDeleted = await this.gastoRepository.deleteGasto(
        gastoId,
        productId
      );

      if (!gastoDeleted) {
        console.log(
          'Product Service: Producto no encontrado para eliminar el gasto'
        );
        return {
          status: 404,
          payload: 'Producto no encontrado para eliminar el gasto',
        };
      }

      console.log('Product Service: Gasto eliminado correctamente');
      return {
        status: 204,
        payload: gastoDeleted,
      };
    } catch (error) {
      console.error(
        `Product Service: Error interno al eliminar un gasto al producto: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async updateGasto(gastoId, productId, gastoData) {
    try {
      if (!gastoId) {
        console.log('Product Service: El id del gasto es requerido');
        return {
          status: 400,
          payload: 'El id del gasto es requerido',
        };
      }

      if (!productId) {
        console.log('Product Service: El id del producto es requerido');
        return {
          status: 400,
          payload: 'El id del producto es requerido',
        };
      }

      const gastoWithId = {
        _id: gastoId,
        ...gastoData,
      };

      const gastoUpdated = await this.gastoRepository.updateGasto(
        gastoId,
        productId,
        gastoWithId
      );

      if (!gastoUpdated) {
        console.log(
          'Product Service: Producto no encontrado para ser actualizado'
        );
        return {
          status: 404,
          payload: 'Producto no encontrado para ser actualizado',
        };
      }

      console.log('Product Service: Gasto actualizado correctamente');
      return {
        status: 200,
        payload: gastoUpdated,
      };
    } catch (error) {
      console.error(
        `Product Service: Error interno al actualizar el gasto: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
