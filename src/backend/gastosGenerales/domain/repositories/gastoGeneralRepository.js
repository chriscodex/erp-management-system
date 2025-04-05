import mongoose from 'mongoose';

import { GastoGeneral } from '@/backend/gastosGenerales/domain/models/gastoGeneral';

export class GastoGeneralRepository {
  async getAllGastosGenerales() {
    try {
      const gastosGenerales = await GastoGeneral.find();

      if (gastosGenerales?.length === 0) {
        console.log('Gasto General Repository: No se encontraron gastos generales');
        return [];
      }

      console.log('Gasto General Repository: Gastos generales encontrados');
      return gastosGenerales;
    } catch (error) {
      console.error(
        `Gasto General Repository: Error al buscar todos los gastos generales: ${error.message}`
      );
      throw new Error(`Error al buscar todos los gastos generales: ${error.message}`);
    }
  }
  async getGastoGeneralByData(gastoGeneralData) {
    try {
      if (!gastoGeneralData) {
        console.log('Gasto General Repository: Gasto general no proporcionado');
        return null;
      }

      const filter = {};

      if (gastoGeneralData.id) {
        filter._id = new mongoose.Types.ObjectId(gastoGeneralData.id);
      }

      const gastoGeneralFound = await GastoGeneral.findOne(filter);

      if (!gastoGeneralFound) {
        console.log('Gasto General Repository: Gasto general no encontrado');
        return null;
      }

      console.log('Gasto General Repository: Gasto general encontrado');
      return gastoGeneralFound;
    } catch (error) {
      console.error(
        `Gasto General Repository: Error al buscar gasto general: ${error.message}`
      );
      throw new Error(`Error al buscar gasto general: ${error.message}`);
    }
  }
  async createGastoGeneral(gastoGeneral) {
    try {
      const newGastoGeneral = new GastoGeneral(gastoGeneral);
      const savedGastoGeneral = await newGastoGeneral.save();

      console.log('Gasto General Repository: Gasto General creado correctamente');
      return savedGastoGeneral;
    } catch (error) {
      console.log(`Gasto General Repository: Error al crear Gasto General: ${error.message}`);
      throw new Error(`Error al crear Gasto General: ${error.message}`);
    }
  }
  async updateGastoGeneral(gastoGeneralId, gastoGeneral) {
    try {
      const updatedGastoGeneral = await GastoGeneral.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(gastoGeneralId) },
        gastoGeneral,
        {
          new: true,
        }
      );

      if (!updatedGastoGeneral) {
        console.log(
          'Gasto General Repository: Gasto general no encontrado para ser actualizado'
        );
        return null;
      }

      console.log('Gasto General Repository: Gasto general actualizado correctamente');
      return updatedGastoGeneral;
    } catch (error) {
      console.error(
        `Gasto General Repository: Error al actualizar gasto general: ${error.message}`
      );
      throw new Error(`Error al actualizar gasto general: ${error.message}`);
    }
  }
  async deleteGastoGeneral(gastoGeneralId) {
    try {
      const deletedGastoGeneral = await GastoGeneral.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(gastoGeneralId),
      });

      if (!deletedGastoGeneral) {
        console.log(
          'Gasto General Repository: Gasto general no encontrado para ser eliminado'
        );
        return null;
      }

      console.log('Gasto General Repository: Gasto general encontrado y eliminado');
      return deletedGastoGeneral;
    } catch (error) {
      console.error(
        `Gasto General Repository: Error al eliminar gasto general: ${error.message}`
      );
      throw new Error(`Error al eliminar gasto general: ${error.message}`);
    }
  }
}
