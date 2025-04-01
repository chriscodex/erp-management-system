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

// export async function getCounterBoletaRequestServer() {
//   try {
//     await connectDB();
//     const ventaService = new VentaService();

//     const response = await ventaService.getCounterBoleta();

//     if (response?.status !== 200) {
//       console.log('Error al obtener el contador de boleta');
//       return { counterBoleta: 0, status: response?.status };
//     }
//     const counterBoleta = response?.payload;
//     return {
//       counterBoleta: counterBoleta,
//       status: 200,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }