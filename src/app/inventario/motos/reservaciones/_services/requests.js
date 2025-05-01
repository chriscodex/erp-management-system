import { ReservacionService } from '@/backend/reservaciones/application/reservacion.service';
import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';

export async function getReservacionRequestServer(reservacionId) {
  try {
    await connectDB();
    const reservacionService = new ReservacionService();

    const response = await reservacionService.getReservacionByData({
      id: reservacionId,
    });

    if (response?.status !== 200) {
      console.log('Error al obtener la reservación desde el servidor');
      return { reservacion: null, status: response?.status };
    }
    const reservacion = response?.payload;
    return {
      reservacion: simplificadorParaClientComponent(reservacion),
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getAllReservacionesRequestServer() {
  try {
    await connectDB();
    const reservacionService = new ReservacionService();

    const response = await reservacionService.getAllReservaciones();

    if (response?.status !== 200) {
      console.log('Error al obtener todas las reservaciones');
      return { reservaciones: [], status: 500 };
    }
    const reservaciones = response?.payload;

    return {
      reservaciones: simplificadorParaClientComponent(reservaciones),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}