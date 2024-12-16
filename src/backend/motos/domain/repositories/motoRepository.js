import mongoose from 'mongoose';

import { Moto } from '@/backend/motos/domain/models/moto';

export class MotoRepository {
  constructor() {
    this.motoModel = Moto;
  }
  async createMoto(motoData) {
    try {
      const newMoto = new this.motoModel(motoData);
      const motoSaved = await newMoto.save();

      // Populamos el campo segmentId después de guardar
      const populatedMoto = await motoSaved.populate([
        { path: 'modeloId' },
        { path: 'almacenId' },
        { path: 'proveedorId' },
      ]);

      console.log('Moto Repository: Moto creado correctamente');
      return populatedMoto;
    } catch (error) {
      console.log(`Moto Repository: Error al crear la moto: ${error.message}`);
      throw new Error(`Error al crear la moto: ${error.message}`);
    }
  }
}
