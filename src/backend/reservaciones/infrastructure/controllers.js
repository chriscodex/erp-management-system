import { ReservacionService } from '@/backend/reservaciones/application/reservacion.service';
import { connectDB } from '@/db/mongodb';

const reservacionService = new ReservacionService();

export async function getReservacionesController() {
  try {
    await connectDB();
    const reservaciones = await reservacionService.getAllReservaciones();
    return reservaciones;
  } catch (error) {
    console.error(
      'Reservacion Controller: Error interno al obtener todas las reservaciones:',
      error.message,
    );
    throw new Error(
      'Reservacion Controller: Error interno al obtener todas las reservaciones',
    );
  }
}

export async function getReservacionByDataController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;

    await connectDB();

    const reservacion = await reservacionService.getReservacionByData({
      _id: id,
    });
    return reservacion;
  } catch (error) {
    console.error(
      'Reservacion Controller: Error interno al obtener la reservación:',
      error.message,
    );
    throw new Error(
      'Reservacion Controller: Error interno al obtener la reservación',
    );
  }
}

export async function createReservacionController(request) {
  try {
    const body = await request.json();

    await connectDB();

    /* Responses { payload, status} */
    const createdReservacion = await reservacionService.createReservacion(body);

    return createdReservacion;
  } catch (error) {
    console.error(
      'Reservacion Controller: Error interno al crear la reservación:',
      error.message,
    );
    throw new Error(
      'Reservacion Controller: Error interno al crear la reservación',
    );
  }
}

export async function updateReservacionController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;
    const body = await request.json();

    await connectDB();

    const updatedReservacion = await reservacionService.updateReservacion(
      id,
      body,
    );
    return updatedReservacion;
  } catch (error) {
    console.error(
      'Reservacion Controller: Error interno al actualizar la reservación:',
      error.message,
    );
    throw new Error(
      'Reservacion Controller: Error interno al actualizar la reservación',
    );
  }
}

export async function deleteReservacionController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { id: reservacionId } = params;

    await connectDB();

    const deletedReservacion =
      await reservacionService.deleteReservacion(reservacionId);
    return deletedReservacion;
  } catch (error) {
    console.error(
      'Reservacion Controller: Error interno eliminando la reservación:',
      error.message,
    );
    throw new Error(
      'Reservacion Controller: Error interno eliminando la reservación',
    );
  }
}
