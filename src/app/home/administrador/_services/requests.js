import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';
import { CounterService } from '@/backend/counters/application/counterService';
import { ProductService } from '@/backend/products/application/products.service';
import { MotoService } from '@/backend/motos/application/moto.service';
import { GastoGeneralService } from "@/backend/gastosGenerales/application/gastoGeneral.service";
import { VentaHistoricaService } from '@/backend/ventas/application/ventaHistorica.service';
import { PedidoService } from '@/backend/pedidos/application/pedido.service';
import { OrdenServicioHistoricaService } from '@/backend/ordenesServicio/application/ordenServicioHistorica.service';
import { ReservacionService } from '@/backend/reservaciones/application/reservacion.service';
import { PreventaService } from '@/backend/preventas/application/preventa.service';
import { OrdenServicioService } from '@/backend/ordenesServicio/application/ordenServicio.service';

export async function getCounterByTypeRequestServer(name) {
  try {
    await connectDB();
    const counterService = new CounterService();

    const response = await counterService.getCurrentCounterByType(name);

    if (response?.status !== 200) {
      console.log('Error al obtener el contador de ' + name);
      return { contador: [], status: 500 };
    }
    const contador = response?.payload;
    return {
      contador: simplificadorParaClientComponent(contador),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}
export async function getAllProductsRequestServer() {
  try {
    await connectDB();
    const productService = new ProductService();

    const response = await productService.getAllProducts();

    if (response?.status !== 200) {
      console.log('Error al obtener todos los productos');
      return { products: [], status: 500 };
    }
    const products = response?.payload;
    return {
      products: simplificadorParaClientComponent(products),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllMotosRequestServer() {
  try {
    await connectDB();
    const motoService = new MotoService();

    const response = await motoService.getAllMotos();

    if (response?.status !== 200) {
      console.log('Error al obtener todas las motos');
      return { motos: [], status: 500 };
    }

    const motos = response?.payload;

    return {
      motos: simplificadorParaClientComponent(motos),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}
export async function getAllGastosGeneralesRequestServer() {
  try {
    await connectDB();
    const gastoGeneralService = new GastoGeneralService();

    const response = await gastoGeneralService.getAllGastosGenerales();
    if (response?.status !== 200) {
      console.log("Error al obtener todos los gastos generales");
      return { gastosGenerales: [], status: response?.status };
    }
    const gastosGenerales = response?.payload;
    return {
      gastosGenerales: simplificadorParaClientComponent(gastosGenerales),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllVentasHistoricasRequestServer() {
  try {
    await connectDB();
    const ventasHistoricasService = new VentaHistoricaService();

    const response = await ventasHistoricasService.getAllVentasHistoricas();

    if (response?.status !== 200) {
      console.log('Error al obtener todas las ventas historicas');
      return { ventasHistoricas: [], status: 500 };
    }
    const ventasHistoricas = response?.payload;
    return {
      ventasHistoricas: simplificadorParaClientComponent(ventasHistoricas),
      status: 200,
    };
  } catch (error) {
    console.error(error);
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

export async function getAllPedidosRequestServer() {
  try {
    await connectDB();
    const pedidoService = new PedidoService();

    const response = await pedidoService.getAllPedidos();

    if (response?.status !== 200) {
      console.log("Error al obtener todos los pedidos");
      return { pedidos: [], status: 500 };
    }
    const pedidos = response?.payload;
    return {
      pedidos: simplificadorParaClientComponent(pedidos),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllOrdenesServicioHistoricasRequestServer() {
  try {
    await connectDB();

    const ordenesServicioHistoricasService = new OrdenServicioHistoricaService();

    const response = await ordenesServicioHistoricasService.getAllOrdenesDeServicioHistoricas();

    if (response?.status !== 200) {
      console.log('Error al obtener todas las órdenes históricas');
      return { ordenesServicioHistoricas: [], status: 500 };
    }
    const ordenesServicioHistoricas = response?.payload;
    return {
      ordenesServicioHistoricas: simplificadorParaClientComponent(ordenesServicioHistoricas),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllPreventasRequestServer() {
  try {
    await connectDB();
    const preventaService = new PreventaService();

    const response = await preventaService.getAllPreventas();

    if (response?.status !== 200) {
      console.log('Error al obtener todas las preventas');
      return { preventas: [], status: 500 };
    }
    const preventas = response?.payload;

    return {
      preventas: simplificadorParaClientComponent(preventas),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllOrdenesDeServicioRequestServer() {
  try {
    await connectDB();
    const ordenDeServicioService = new OrdenServicioService();

    const response = await ordenDeServicioService.getAllOrdenesDeServicio();

    if (response?.status !== 200) {
      console.log('Error al obtener todas las órdenes de servicio');
      return { ventas: [], status: 500 };
    }
    const ordenesDeServicio = response?.payload;

    return {
      ordenesDeServicio: simplificadorParaClientComponent(ordenesDeServicio),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}