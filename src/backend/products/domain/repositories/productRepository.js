import mongoose from 'mongoose';

import { Product } from '@/backend/products/domain/models/product';
import { Segment } from '@/backend/segments/domain/models/segment';
import { Category } from '@/backend/categorias/domain/models/category';
import { Marca } from '@/backend/marcas/domain/models/marca';
import { Almacen } from '@/backend/almacenes/domain/models/almacen';
import { Proveedor } from '@/backend/proveedores/domain/models/proveedor';

export class ProductRepository {
  constructor() {
    this.productModel = Product;
    this.segmentModel = Segment;
    this.categoryModel = Category;
    this.marcaModel = Marca;
    this.almacenModel = Almacen;
    this.proveedorModel = Proveedor;
  }
  async getAllProducts() {
    try {
      const products = await this.productModel
        .find()
        .populate('marcaId')
        .populate('categoryId')
        .populate('almacenId')
        .populate('proveedorId');

      if (products?.length === 0) {
        console.log('Product Repository: No se encontraron products');
        return [];
      }

      console.log('Product Repository: Productos encontrados');
      return products;
    } catch (error) {
      console.error(
        `Product Repository: Error al buscar todas los productos: ${error.message}`
      );
      throw new Error(
        `Product Repository: Error al buscar todas los productos: ${error.message}`
      );
    }
  }
  async countAllProducts() {
    try {
      const totalProducts = await this.productModel.countDocuments();

      console.log('Product Repository: Productos contados');
      return totalProducts;
    } catch (error) {
      console.error(
        `Product Repository: Error al contar todas los productos: ${error.message}`
      );
      throw new Error(
        `Product Repository: Error al contar todas los productos: ${error.message}`
      );
    }
  }
  async getAllProductsByData(productData) {
    try {
      if (!productData) {
        console.log('Product Repository: Producto no proporcionado');
        return null;
      }

      const filter = {};

      if (productData.id) {
        filter._id = new mongoose.Types.ObjectId(productData.id);
      }

      if (productData.marcaId) {
        filter.marcaId = new mongoose.Types.ObjectId(productData.marcaId);
      }

      if (productData.categoryId) {
        filter.categoryId = new mongoose.Types.ObjectId(productData.categoryId);
      }

      if (productData.almacenId) {
        filter.almacenId = new mongoose.Types.ObjectId(productData.almacenId);
      }

      if (productData.proveedorId) {
        filter.proveedorId = new mongoose.Types.ObjectId(
          productData.proveedorId
        );
      }

      if (productData.code) {
        filter.code = { $regex: new RegExp(`^${productData.code}$`, 'i') };
      }

      if (productData.nombre) {
        filter.nombre = { $regex: new RegExp(`^${productData.nombre}$`, 'i') };
      }

      if (productData.importado) {
        filter.importado = productData.importado;
      }

      const productFound = await this.productModel
        .find(filter)
        .populate('marcaId')
        .populate('categoryId')
        .populate('almacenId')
        .populate('proveedorId');

      if (!productFound) {
        console.log('Product Repository: Productos no encontrados');
        return null;
      }

      console.log('Product Repository: Productos encontrados');
      return productFound;
    } catch (error) {
      console.error(
        `Product Repository: Error al buscar los productos: ${error.message}`
      );
      throw new Error(`Error al buscar los productos: ${error.message}`);
    }
  }
  async getProductByData(productData) {
    try {
      if (!productData) {
        console.log('Producto Repository: Producto no proporcionado');
        return null;
      }

      const filter = {};

      if (productData.id) {
        filter._id = new mongoose.Types.ObjectId(productData.id);
      }

      if (productData.marcaId) {
        filter.marcaId = new mongoose.Types.ObjectId(productData.marcaId);
      }

      if (productData.categoryId) {
        filter.categoryId = new mongoose.Types.ObjectId(productData.categoryId);
      }

      if (productData.almacenId) {
        filter.almacenId = new mongoose.Types.ObjectId(productData.almacenId);
      }

      if (productData.proveedorId) {
        filter.proveedorId = new mongoose.Types.ObjectId(
          productData.proveedorId
        );
      }

      if (productData.unitCode) {
        filter['unidades.code'] = productData.unitCode;
      }

      if (productData.nombre) {
        filter.nombre = { $regex: new RegExp(`^${productData.nombre}$`, 'i') };
      }

      if (productData.importado) {
        filter.importado = productData.importado;
      }

      const productFound = await this.productModel
        .findOne(filter)
        .populate('marcaId')
        .populate('categoryId')
        .populate('almacenId')
        .populate('proveedorId');

      if (!productFound) {
        console.log('Product Repository: Producto no encontrado');
        return null;
      }

      console.log('Product Repository: Producto encontrado');
      return productFound;
    } catch (error) {
      console.error(
        `Product Repository: Error al buscar el producto: ${error.message}`
      );
      throw new Error(`Error al buscar el producto: ${error.message}`);
    }
  }
  async createProduct(productData) {
    try {
      const newProduct = new this.productModel(productData);
      const savedProduct = await newProduct.save();

      // Populamos el campo segmentId después de guardar
      const populatedProduct = await savedProduct.populate([
        { path: 'marcaId' },
        { path: 'categoryId' },
        { path: 'almacenId' },
        { path: 'proveedorId' },
      ]);

      console.log('Product Repository: Product creada correctamente');
      return populatedProduct;
    } catch (error) {
      console.log(
        `Product Repository: Error al crear el producto: ${error.message}`
      );
      throw new Error(`Error al crear el producto: ${error.message}`);
    }
  }
  async updateProduct(productId, productData) {
    try {
      const updatedProduct = await this.productModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(productId) },
        productData,
        {
          new: true,
        }
      );

      if (!updatedProduct) {
        console.log(
          'Product Repository: Producto no encontrado para ser actualizado'
        );
        return null;
      }

      console.log('Product Repository: Producto actualizado correctamente');
      return updatedProduct;
    } catch (error) {
      console.error(
        `Product Repository: Error al actualizar el producto: ${error.message}`
      );
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  }
  async updateUnitProduct(unitProductId, unitProductData) {
    try {
      const filter = {};

      // Recorrer las claves de unitProductData y construir el filtro
      for (const key in unitProductData) {
        if (Object.hasOwnProperty.call(unitProductData, key)) {
          filter[`unidades.$.${key}`] = unitProductData[key];
        }
      }

      // Realizar la actualización
      const productUpdated = await this.productModel.findOneAndUpdate(
        { 'unidades._id': unitProductId }, // Filtrar por el ID del subdocumento
        { $set: filter }, // Actualizar dinámicamente solo los campos enviados
        { new: true } // Retornar el producto actualizado
      );

      // Manejo de errores o producto no encontrado
      if (!productUpdated) {
        throw new Error(
          `Producto con la unidad ${unitProductId} no encontrado`
        );
      }

      return productUpdated;
    } catch (error) {
      console.log(
        `Product Repository: Error al actualizar el unitProduct: ${error.message}`
      );
      throw new Error(`Error al actualizar el unitProduct: ${error.message}`);
    }
  }
  async deleteProduct(productId) {
    try {
      const deletedProduct = await this.productModel.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(productId),
      });

      if (!deletedProduct) {
        console.log(
          'Product Repository: Producto no encontrado para ser eliminado'
        );
        return null;
      }

      console.log('Product Repository: Producto encontrado y eliminado');
      return deletedProduct;
    } catch (error) {
      console.error(
        `Product Repository: Error al eliminar el producto: ${error.message}`
      );
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  }
  async addUnitsToProduct(productId, nuevasUnidades, cantidadAAgregar) {
    try {
      // Validar que el producto exista antes de actualizar
      const product = await this.productModel.findById(productId);
      if (!product) {
        console.log('Product Repository: Producto no encontrado');
        throw new Error(`Producto con ID ${productId} no encontrado.`);
      }

      // Actualizar el producto con las nuevas unidades y el stock
      const productoActualizado = await this.productModel.findByIdAndUpdate(
        productId,
        {
          $push: { unidades: { $each: nuevasUnidades } },
          $inc: { stock: cantidadAAgregar }, // Incrementar el stock
        },
        { new: true, runValidators: true } // Retornar el documento actualizado
      );

      console.log(
        'Product Repository: Unidades agregadas correctamente al producto'
      );
      return productoActualizado;
    } catch (error) {
      console.error(
        `Product Repository: Error al agregar unidades: ${error.message}`
      );
      throw new Error(`Error al agregar unidades: ${error.message}`);
    }
  }

  async removeUnitsToProduct(productId, cantidadARemover) {
    try {
      // Buscar el producto en la base de datos
      const product = await this.productModel.findById(productId);
      if (!product) {
        console.log('Product Repository: Producto no encontrado');
        throw new Error(`Producto con ID ${productId} no encontrado.`);
      }

      // Eliminar las unidades necesarias desde el final
      const remainingUnits = product.unidades.slice(
        0,
        product?.unidades?.length - cantidadARemover
      );

      // Actualizar el producto en la base de datos
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        productId,
        {
          $set: { unidades: remainingUnits },
          $inc: { stock: -cantidadARemover }, // Reducir el stock
        },
        { new: true, runValidators: true } // Retornar el producto actualizado
      );

      console.log(
        'Product Repository: Unidades eliminadas correctamente del producto'
      );
      return updatedProduct;
    } catch (error) {
      console.error(
        `Product Repository: Error al eliminar unidades: ${error.message}`
      );
      throw new Error(`Error al eliminar unidades: ${error.message}`);
    }
  }
  async deleteSingleUnitFromProduct(productId, unitId) {
    try {
      // Buscar el producto en la base de datos
      const product = await this.productModel.findById(productId);
      if (!product) {
        console.log('Product Repository: Producto no encontrado');
        throw new Error(`Producto con ID ${productId} no encontrado.`);
      }

      // Buscar la unidad con el _id proporcionado
      const unitIndex = product.unidades.findIndex(
        (unit) => unit._id.toString() === unitId.toString()
      );
      if (unitIndex === -1) {
        console.log('Product Repository: Unidad no encontrada');
        throw new Error(
          `Unidad con ID ${unitId} no encontrada en el producto.`
        );
      }

      // Eliminar la unidad del array de unidades
      product.unidades.splice(unitIndex, 1); // Eliminar la unidad

      // Actualizar el stock (decrementar en 1)
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        productId,
        {
          $set: { unidades: product.unidades },
          $inc: { stock: -1 }, // Reducir el stock en 1
        },
        { new: true, runValidators: true }
      );

      console.log(
        'Product Repository: Unidad eliminada correctamente del producto'
      );
      return updatedProduct;
    } catch (error) {
      console.error(
        `Product Repository: Error al eliminar unidad: ${error.message}`
      );
      throw new Error(`Error al eliminar unidad: ${error.message}`);
    }
  }
}
