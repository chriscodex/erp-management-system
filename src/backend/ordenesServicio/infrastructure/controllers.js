import { connectDB } from '@/db/mongodb';
import { OrdenServicioService } from '@/backend/ordenesServicio/application/ordenServicio.service';

const ordenServicioService = new OrdenServicioService();

export async function createOrdenDeServicioController(request) {
  try {
    const body = await request.json();

    await connectDB();

    const createdOrdenDeServicio = await ordenServicioService.createOrdenDeServicio(body);
    return createdOrdenDeServicio;
  } catch (error) {
    console.error(
      'Orden de Servicio Controller: Error interno al crear la orden de servicio:',
      error.message
    );
    throw new Error('Orden de Servicio Controller: Error interno al crear la orden de servicio');
  }
}

export async function updateOrdenDeServicioController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { id: ordenDeServicioId } = params;
    const body = await request.json();

    await connectDB();

    const result = await ordenServicioService.updateOrdenDeServicio(ordenDeServicioId, body);
    return result;
  } catch (error) {
    console.error(
      'Orden de Servicio Controller: Error interno actualizando la orden de servicio',
      error.message
    );
    throw new Error(
      'Orden de Servicio Controller: Error interno actualizando la orden de servicio'
    );
  }
}

export async function deleteOrdenDeServicioController(contextRoute) {
  try {

    const { params } = contextRoute;
    const { id: ordenDeServicioId } = params;

    await connectDB();

    const deletedOrdenDeServicio = await ordenServicioService.deleteOrdenDeServicio(ordenDeServicioId);
    return deletedOrdenDeServicio;
  } catch (error) {
    console.error(
      "Orden de Servicio Controller: Error interno eliminando la orden de servicio",
      error.message
    );
    throw new Error("Orden de Servicio Controller: Error interno eliminando la orden de servicio");
  }
}

export async function finalizarOrdenDeServicioController(contextRoute) {
  try {

    const { params } = contextRoute;
    const { id } = params;

    await connectDB();

    const ordenDeServicioFinalizada = await ordenServicioService.finalizarOrdenDeServicio(id);

    return ordenDeServicioFinalizada;

  } catch (error) {
    console.error(
      'Orden de Servicio Controller: Error interno al finalizar la orden de servicio',
      error.message
    );
    throw new Error('Orden de Servicio Controller: Error interno al finalizar la orden de servicio');
  }
}

