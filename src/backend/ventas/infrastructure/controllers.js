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
