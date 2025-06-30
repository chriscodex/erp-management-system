import { connectDB } from '@/db/mongodb';
import { VentaService } from '@/backend/ventas/application/venta.service';

const ventaService = new VentaService();

export async function createVentaController(request) {
  try {
    const body = await request.json();

    await connectDB();

    const createdVenta = await ventaService.createVenta(body?.id);
    return createdVenta;
  } catch (error) {
    console.error(
      'Venta Controller: Error interno al crear la venta:',
      error.message
    );
    throw new Error('Venta Controller: Error interno al crear la venta');
  }
}

export async function updateVentaController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { ventaId } = params;
    const body = await request.json(); 

    await connectDB();

    const updatedVenta = await ventaService.updateVenta(ventaId, body);
    return updatedVenta;
  } catch (error) {
    console.error(
      'Venta Controller: Error interno al actualizar la venta:',
      error.message
    );
    throw new Error('Venta Controller: Error interno al actualizar la venta');
  }
}

export async function deleteVentaController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { ventaId } = params;

    await connectDB();

    const deletedVenta = await ventaService.deleteVenta(ventaId);
    return deletedVenta;
  } catch (error) {
    console.error(
      'Venta Controller: Error interno al eliminar la venta:',
      error.message
    );
    throw new Error('Venta Controller: Error interno al eliminar la venta');
  }
}

export async function finalizarVentaController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { ventaId } = params;

    await connectDB();

    const finalizadaVenta = await ventaService.finalizarVenta(ventaId);
    return finalizadaVenta;
  } catch (error) {
    console.error(
      'Venta Controller: Error interno al finalizar la venta:',
      error.message
    );
    throw new Error('Venta Controller: Error interno al finalizar la venta');
  }
}