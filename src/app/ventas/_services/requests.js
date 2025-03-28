import { VentaService } from '@/backend/ventas/application/venta.service';
import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';

export async function getVentaRequestServer(ventaId) {
  try {
    await connectDB();
    const ventaService = new VentaService();

    const response = await ventaService.getVentaByData({
      id: ventaId,
    });

    if (response?.status !== 200) {
      console.log('Error al obtener la venta desde el servidor');
      return { venta: null, status: response?.status };
    }
    const venta = response?.payload;
    return {
      venta: simplificadorParaClientComponent(venta),
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getCounterBoletaRequestServer() {
  try {
    await connectDB();
    const ventaService = new VentaService();

    const response = await ventaService.getCounterBoleta();

    if (response?.status !== 200) {
      console.log('Error al obtener el contador de boleta');
      return { counterBoleta: 0, status: response?.status };
    }
    const counterBoleta = response?.payload;
    return {
      counterBoleta: counterBoleta,
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getAllVentasRequestServer() {
  try {
    await connectDB();
    const ventaService = new VentaService();

    const response = await ventaService.getAllVentas();

    if (response?.status !== 200) {
      console.log('Error al obtener todas las ventas');
      return { ventas: [], status: 500 };
    }
    const ventas = response?.payload;

    return {
      ventas: simplificadorParaClientComponent(ventas),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}
