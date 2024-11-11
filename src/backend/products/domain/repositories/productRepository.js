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
        .populate('categoriaId')
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
  async getProductById(id) {
    try {
      const productFound = await this.productModel
        .findOne({
          _id: new mongoose.Types.ObjectId(id),
        })
        .populate('segmentId')
        .populate('marcaId')
        .populate('categoriaId')
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
      const populatedProduct = await savedProduct.populate('segmentId');

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
