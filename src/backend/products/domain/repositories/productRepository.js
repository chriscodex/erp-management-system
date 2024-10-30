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
        console.log('Products Repository: No se encontraron products');
        return null;
      }

      console.log('Products Repository: Productos encontrados');
      return products;
    } catch (error) {
      console.error(
        `Products Repository: Error al buscar todas los productos: ${error.message}`
      );
      throw new Error(
        `Products Repository: Error al buscar todas los productos: ${error.message}`
      );
    }
  }
}
