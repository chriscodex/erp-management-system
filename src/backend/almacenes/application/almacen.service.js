import { AlmacenRepository } from '@/backend/almacenes/domain/repositories/almacenRepository';

export class AlmacenService {
  constructor() {
    this.almacenRepository = new AlmacenRepository();
  }
  async getAllAlmacenes() {
    try {
      const almacenes = await this.almacenRepository.getAllAlmacenes();

      if (!almacenes) {
        console.log('Almacen Service: No se encontraron almacenes');
        return {
          status: 404,
          payload: 'No se encontraron almacenes',
        };
      }

      console.log('Almacen Service: almacenes encontrados');
      return {
        status: 200,
        payload: almacenes,
      };
    } catch (error) {
      console.error(
        `Almacen Service: Error interno al buscar todas los almacenes: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
