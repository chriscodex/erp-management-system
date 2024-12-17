import mongoose from 'mongoose';

import { Moto } from '@/backend/motos/domain/models/moto';

export class GastoMotoRepository {
  constructor() {
    this.motoModel = Moto;
  }
  async createGastoMoto(gastoData, motoId) {
    try {
      const gastoCreated = await this.motoModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(motoId) },
        { $push: { gastos: gastoData } },
        {
          new: true,
        }
      );

      if (!gastoCreated) {
        console.log('GastoMoto Repository: Moto no encontrada');
        return null;
      }

      console.log('GastoMoto Repository: Gasto agregado correctamente');
      return gastoCreated;
    } catch (error) {
      console.error(
        `GastoMoto Repository: Error al agregar un gasto a la moto: ${error.message}`
      );
      throw new Error(`Error al agregar un gasto a la moto: ${error.message}`);
    }
  }
  async deleteGastoMoto(gastoId, motoId) {
    try {
      const gastoDeleted = await this.motoModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(motoId) },
        { $pull: { gastos: { _id: new mongoose.Types.ObjectId(gastoId) } } }
      );

      if (!gastoDeleted) {
        console.log('GastoMoto Repository: Moto no encontrada');
        return null;
      }

      console.log('GastoMoto Repository: Gasto eliminado correctamente');
      return gastoDeleted;
    } catch (error) {
      console.error(
        `GastoMoto Repository: Error al eliminar un gasto a la moto: ${error.message}`
      );
      throw new Error(`Error al eliminar un gasto a la moto: ${error.message}`);
    }
  }
  async updateGastoMoto(gastoId, motoId, gastoData) {
    try {
      const updatedProduct = await this.motoModel.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(motoId),
          'gastos._id': new mongoose.Types.ObjectId(gastoId),
        },
        { $set: { 'gastos.$': gastoData } }
      );

      if (!updatedProduct) {
        console.log('GastoMoto Repository: Moto o gasto no encontrado');
        return null;
      }

      console.log('GastoMoto Repository: Gasto actualizado correctamente');
      return updatedProduct;
    } catch (error) {
      console.error(
        `GastoMoto Repository: Error al actualizar el gasto de la moto: ${error.message}`
      );
      throw new Error(
        `Error al actualizar el gasto de la moto: ${error.message}`
      );
    }
  }
}
