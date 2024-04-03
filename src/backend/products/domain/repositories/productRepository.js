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
        .populate('segmentId')
        .populate('marcaId')
        .populate('categoryId')
        .populate('almacenId')
        .populate('proveedorId');

      if (products.length === 0) {
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
  async getProductByData(productData) {
    try {
      if (!productData) {
        console.log('Proveedor Repository: Proveedor no proporcionado');
        return null;
      }

      const filter = {};

      if (productData.id) {
        filter._id = new mongoose.Types.ObjectId(productData.id);
      }

      if (productData.segmentId) {
        filter.segmentId = new mongoose.Types.ObjectId(productData.segmentId);
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

      const productFound = await this.productModel
        .findOne(filter)
        .populate('segmentId')
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
        { path: 'segmentId' },
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
}
