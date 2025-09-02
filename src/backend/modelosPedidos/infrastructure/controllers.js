import { ModeloPedidoService } from '@/backend/modelosPedidos/application/modeloPedido.service';
import { connectDB } from '@/db/mongodb';

const modeloPedidoService = new ModeloPedidoService();

export async function createModeloPedidoController(request) {
  try {
    const body = await request.json();

    await connectDB();

    const modeloPedidoCreated =
      await modeloPedidoService.createModeloPedido(body);
    return modeloPedidoCreated;
  } catch (error) {
    console.error(
      'Modelo Pedido Controller: Error interno al crear el modelo:',
      error.message,
    );
    throw new Error(
      'Modelo Pedido Controller: Error interno al crear el modelo',
    );
  }
}

export async function updateModeloPedidoController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { modeloPedidoId } = params;
    const body = await request.json();

    await connectDB();

    const updatedModeloPedido = await modeloPedidoService.updateModeloPedido(
      modeloPedidoId,
      body,
    );
    return updatedModeloPedido;
  } catch (error) {
    console.error(
      'Modelo Pedido Controller: Error interno al actualizar el modelo:',
      error.message,
    );
    throw new Error(
      'Modelo Pedido Controller: Error interno al actualizar el modelo',
    );
  }
}
export async function deleteModeloPedidoController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { modeloPedidoId } = params;

    await connectDB();

    const deletedModeloPedido =
      await modeloPedidoService.deleteModeloPedido(modeloPedidoId);

    return deletedModeloPedido;
  } catch (error) {
    console.error(
      'Modelo Pedido Controller: Error interno al eliminar un modelo:',
      error.message,
    );
    throw new Error(
      'Modelo Pedido Controller: Error interno al eliminar un modelo',
    );
  }
}
