import { Preventa } from '@/backend/preventas/domain/models/preventa';

export class PreventaRepository {
  constructor() {
    this.preventaModel = Preventa;
  }

  async createPreventa(preventaData) {
    try {
      const newPreventa = new this.preventaModel(preventaData);
      const savedPreventa = await newPreventa.save();

      console.log('Preventa Repository: Preventa creada correctamente');
      return savedPreventa;
    } catch (error) {
      console.log(
        `Preventa Repository: Error al crear preventa: ${error.message}`
      );
      throw new Error(`Error al crear preventa: ${error.message}`);
    }
  }
}
