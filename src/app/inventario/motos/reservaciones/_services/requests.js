import { ReservacionService } from '@/backend/reservaciones/application/reservacion.service';
import { connectDB } from '@/db/mongodb';
import { deleteData } from '@/lib/fetchData';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';
import { deleteReservacionClientUrl } from '@/lib/urls';

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

// export async function deleteReservacionRequestClient(reservacionId) {
//   /* eslint-disable */
//   return new Promise(async (resolve, reject) => {
//     /* eslint-enable */
//     try {
//       // Simular tiempo de retraso
//       await delay();

//       const url = `${deleteReservacionClientUrl}/${reservacionId}`;

//       // Obtener los datos de la persona
//       const response = await deleteData(url);
//       if (response?.status !== 204) {
//         reject(
//           'No se pudo eliminar la reservacion: ' + response.response?.data?.error
//         );
//         return;
//       }

//       resolve(response?.response?.data?.payload);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }