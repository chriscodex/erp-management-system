import { ReservacionRepository } from '@/backend/reservaciones/domain/repositories/reservacionRepository';
import { createReservacionSchema } from '@/backend/reservaciones/application/validations/createReservacionSchema';
import { updateReservacionSchema } from '@/backend/reservaciones/application/validations/updateReservacionSchema';


export class ReservacionService {
  constructor() {
    this.reservacionRepository = new ReservacionRepository();
  }
  async getAllReservaciones() {
    try {
      const reservaciones = await this.reservacionRepository.getAllReservaciones();

      if (reservaciones?.length === 0) {
        console.log('Reservacion Service: No se encontraron reservaciones');
        return {
          status: 200,
          payload: [],
        };
      }

      console.log('Reservacion Service: Reservaciones encontradas');
      return {
        status: 200,
        payload: reservaciones,
      };
    } catch (error) {
      console.error(
        `Reservacion Service: Error interno al buscar todas las reservaciones: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getReservacionByData(reservacionData) {
    try {

      console.log(reservacionData);

      const reservacionFound = await this.reservacionRepository.getReservacionByData(reservacionData);

      if (!reservacionFound) {
        console.log('Reservacion Service: La reservación no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Reservacion Service: La reservación existe');
      return {
        status: 200,
        payload: reservacionFound,
      };
    } catch (error) {
      console.error(
        `Reservacion Service: Error interno al buscar una reservación: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async createReservacion(reservacion) {
    try {
      
      const reservacionValidated = createReservacionSchema.safeParse(reservacion);

      if (!reservacionValidated.success) {
        console.log(
          'Reservacion Service: Error de validación de schema de reservación al crear'
        );
        return {
          status: 400,
          payload: reservacionValidated.error.issues,
        };
      }
      // Crear el objeto de reservacion
      const reservacionObject = {
        ...reservacion,
      };

      // Crear la reservacion
      const reservacionCreated = await this.reservacionRepository.createReservacion(reservacionObject);

      const reservacionCreatedObject = reservacionCreated.toObject();

      console.log('Reservacion Service: Reservación creada correctamente');
      return {
        status: 201,
        payload: reservacionCreatedObject,
      };
    } catch (error) {
      console.error(
        `Reservacion Service: Error interno al crear una reservación: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async updateReservacion(reservacionId, reservacionData) {
    try {
      // Validar los datos de la reservacion enviada con el schema
      const reservacionValidated = updateReservacionSchema.safeParse(reservacionData);

      if (!reservacionValidated.success) {
        console.log(
          'Reservacion Service: Error de validación de schema de reservación al actualizar'
        );
        return {
          status: 400,
          payload: reservacionValidated.error.issues,
        };
      }

      const reservacionUpdated = await this.reservacionRepository.updateReservacion(
        reservacionId,
        reservacionData
      );

      if (!reservacionUpdated) {
        console.log('Reservacion Service: La reservación no existe');
        return {
          status: 200,
          payload: reservacionUpdated,
        };
      }

      console.log('Reservacion Service: Reservación actualizada correctamente');
      return {
        status: 200,
        payload: reservacionUpdated,
      };
    } catch (error) {
      console.error(
        `Reservacion Service: Error interno al actualizar una reservación: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deleteReservacion(reservacionId) {
    try {
      const reservacionDeleted = await this.reservacionRepository.deleteReservacion(reservacionId);

      if (!reservacionDeleted) {
        console.log('Reservacion Service: La reservación no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Reservacion Service: Reservación eliminada correctamente');
      return {
        status: 204,
        payload: reservacionDeleted,
      };
    } catch (error) {
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}

