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
        return null;
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
}
