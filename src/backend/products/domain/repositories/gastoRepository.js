import mongoose from 'mongoose';

import { Product } from '@/backend/products/domain/models/product';

export class GastoRepository {
  constructor() {
    this.productModel = Product;
  }
  async createGasto(gastoData, productId) {
    try {
      const updatedMarca = await this.productModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(productId) },
        { $push: { gastos: gastoData } },
        {
          new: true,
        }
      );

      if (!updatedMarca) {
        console.log('Product Repository: Producto no encontrado');
        return null;
      }

      console.log('Product Repository: Gasto agregado correctamente');
      return updatedMarca;
    } catch (error) {
      console.error(
        `Product Repository: Error al agregar un gasto al producto: ${error.message}`
      );
      throw new Error(
        `Error al agregar un gasto al producto: ${error.message}`
      );
    }
  }
}
