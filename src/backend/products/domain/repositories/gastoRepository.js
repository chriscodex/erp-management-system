import mongoose from 'mongoose';

import { Product } from '@/backend/products/domain/models/product';

export class GastoRepository {
  constructor() {
    this.productModel = Product;
  }
  async createGasto(gastoData, productId) {
    try {
      const gastoCreated = await this.productModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(productId) },
        { $push: { gastos: gastoData } },
        {
          new: true,
        }
      );

      if (!gastoCreated) {
        console.log('Product Repository: Producto no encontrado');
        return null;
      }

      console.log('Product Repository: Gasto agregado correctamente');
      return gastoCreated;
    } catch (error) {
      console.error(
        `Product Repository: Error al agregar un gasto al producto: ${error.message}`
      );
      throw new Error(
        `Error al agregar un gasto al producto: ${error.message}`
      );
    }
  }
  async deleteGasto(gastoId, productId) {
    try {
      const gastoDeleted = await this.productModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(productId) },
        { $pull: { gastos: { _id: new mongoose.Types.ObjectId(gastoId) } } }
      );

      if (!gastoDeleted) {
        console.log('Product Repository: Producto no encontrado');
        return null;
      }

      console.log('Product Repository: Gasto eliminado correctamente');
      return gastoDeleted;
    } catch (error) {
      console.error(
        `Product Repository: Error al eliminar un gasto al producto: ${error.message}`
      );
      throw new Error(
        `Error al eliminar un gasto al producto: ${error.message}`
      );
    }
  }
}
