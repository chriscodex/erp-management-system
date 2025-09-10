import { NotificacionService } from '@/backend/notificaciones/application/notificacion.service';
import { connectDB } from '@/db/mongodb';
const notificacionService = new NotificacionService();

export async function getNotificacionesController() {
  try {
    await connectDB();
    const notificaciones =
      await notificacionService.checkAndSyncNotificaciones();
    return notificaciones;
  } catch (error) {
    console.error(
      'Notificacion Controller: Error interno al obtener las notificaciones:',
      error.message,
    );
    throw new Error(
      'Notificacion Controller: Error interno al obtener las notificaciones',
    );
  }
}

export async function updateNotificacionController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;
    const body = await request.json();

    await connectDB();

    const updatedNotificacion = await notificacionService.updateNotificacion(
      id,
      body,
    );
    return updatedNotificacion;
  } catch (error) {
    console.error(
      'Notificacion Controller: Error interno al remover la notificacion',
      error.message,
    );
    throw new Error(
      'Notificacion Controller: Error interno al remover la notificacion',
    );
  }
}
