import { CounterRepository } from '@/backend/counters/domain/repositories/counterRepository';

export class CounterService {
  constructor() {
    this.counterRepository = new CounterRepository();
  }

  async getCurrentCounterByType(counterType) {
    try {
      const counter = await this.counterRepository.getCounterByType(
        counterType
      );
      return {
        status: 200,
        payload: counter,
      };
    } catch (error) {
      console.error(
        `Counter Service: Error interno al obtener el contador de boleta: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }

  async aumentarContadorByType(contadorData) {
    try {
      const { type } = contadorData;
      const counter = await this.counterRepository.aumentarContadorByType(type);
      return {
        status: 200,
        payload: counter,
      };
    } catch (error) {
      console.error(
        `Counter Service: Error interno al aumentar el contador: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
