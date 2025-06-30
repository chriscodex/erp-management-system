import { Counter } from '@/backend/counters/domain/models/counter.js';

export class CounterRepository {
  constructor() {
    this.counterModel = Counter;
  }
  async initializeCounters() {
    try {
      const countersToInitialize = [
        { name: 'boletas', sequenceValue: 0 },
        { name: 'facturas', sequenceValue: 0 },
        { name: 'nota-venta', sequenceValue: 0 },
      ];

      for (const counter of countersToInitialize) {
        const existingCounter = await this.counterModel.findOne({
          name: counter.name,
        });

        if (!existingCounter) {
          await this.counterModel.create(counter);
          console.log(`Contador "${counter.name}" inicializado en 0.`);
        }
      }
    } catch (error) {
      console.error('Error inicializando los contadores:', error);
    }
  }

  async getCounterByType(name) {
    const counter = await this.counterModel.findOne({ name });
    return counter ? counter.sequenceValue : 0;
  }

  async aumentarContadorByType(type) {
    const counter = await this.counterModel.findOneAndUpdate(
      { name: type },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true } // Crea el contador si no existe
    );
    return counter.sequenceValue;
  }
}
