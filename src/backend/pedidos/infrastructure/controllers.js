import { PedidoService } from '@/backend/pedidos/application/pedido.service';
import { connectDB } from '@/db/mongodb';

const pedidoService = new PedidoService();

export async function getPedidosController() {
  try {
    await connectDB();

    const pedidos = await pedidoService.getAllPedidos();
    return pedidos;
  } catch (error) {
    console.error(
      'Pedido Controller: Error interno al obtener todos los pedidos:',
      error.message,
    );
    throw new Error(
      'Pedido Controller: Error interno al obtener todos los pedidos',
    );
  }
}

export async function getPedidoByDataController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;

    await connectDB();

    const pedido = await pedidoService.getPedidoByData({ id });
    return pedido;
  } catch (error) {
    console.error(
      'Pedido Controller: Error interno buscando el pedido:',
      error.message,
    );
    throw new Error('Pedido Controller: Error interno buscando el pedido');
  }
}

export async function createPedidoController(request) {
  try {
    const body = await request.json();

    await connectDB();

    const createdPedido = await pedidoService.createPedido(body);
    return createdPedido;
  } catch (error) {
    console.error(
      'Pedido Controller: Error interno al crear el pedido:',
      error.message,
    );
    throw new Error('Pedido Controller: Error interno al crear el pedido');
  }
}

export async function updatePedidoController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;
    const body = await request.json();

    await connectDB();

    const updatedPedido = await pedidoService.updatePedido(id, body);
    return updatedPedido;
  } catch (error) {
    console.error(
      'Pedido Controller: Error interno al actualizar el pedido',
      error.message,
    );
    throw new Error('Pedido Controller: Error interno al actualizar el pedido');
  }
}

export async function deletePedidoController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;

    await connectDB();

    const deletedPedido = await pedidoService.deletePedido(id);

    return deletedPedido;
  } catch (error) {
    console.error(
      'Pedido Controller: Error interno al eliminar un pedido:',
      error.message,
    );
    throw new Error('Pedido Controller: Error interno al eliminar un pedido');
  }
}

export async function inventariarPedidoController(contextRoute) {
  try {
    const { id } = contextRoute;

    await connectDB();

    const inventoriedPedido = await pedidoService.inventariarPedido(id);

    return inventoriedPedido;
  } catch (error) {
    console.error(
      'Pedido Controller: Error interno al inventariar un pedido:',
      error.message,
    );
    throw new Error(
      'Pedido Controller: Error interno al inventariar un pedido',
    );
  }
}
