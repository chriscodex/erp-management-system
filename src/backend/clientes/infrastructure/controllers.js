import { ClienteService } from "@/backend/clientes/application/cliente.service";
import { connectDB } from "@/db/mongodb";

const clienteService = new ClienteService();

export async function getClientesController() {
  try {
    await connectDB();
    const clientes = await clienteService.getAllClientes();
    return clientes;
  } catch (error) {
    console.error(
      "Cliente Controller: Error interno al obtener todos las clientes:",
      error.message
    );
    throw new Error(
      "Cliente Controller: Error interno al obtener todos las clientes"
    );
  }
}


export async function getClienteByDataController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;

    await connectDB();

    const cliente = await clienteService.getClienteByData({ _id: id });
    return cliente;
  } catch (error) {
    console.error(
      "Cliente Controller: Error interno al obtener el cliente",
      error.message
    );
    throw new Error("Cliente Controller: Error interno al obtener el cliente");
  }
}

export async function createClienteController(request) {
  try {
    const body = await request.json();

    await connectDB();

    /* Responses { payload, status} */
    const createdCliente = await clienteService.createCliente(body);

    return createdCliente;
  } catch (error) {
    console.error(
      "Cliente Controller: Error interno al crear el cliente",
      error.message
    );
    throw new Error("Cliente Controller: Error interno al crear el cliente");
  }
}

export async function updateClienteController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;
    const body = await request.json();

    await connectDB();

    const updatedCliente = await clienteService.updateCliente(id, body);
    return updatedCliente;
  } catch (error) {
    console.error(
      "Cliente Controller: Error interno al actualizar el cliente",
      error.message
    );
    throw new Error(
      "Cliente Controller: Error interno al actualizar el cliente"
    );
  }
}

export async function deleteClienteController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { id: clienteId } = params;

    await connectDB();

    const deletedCliente = await clienteService.deleteCliente(clienteId);
    return deletedCliente;
  } catch (error) {
    console.error(
      "Cliente Controller: Error interno eliminando el cliente",
      error.message
    );
    throw new Error("Cliente Controller: Error interno eliminando el cliente");
  }
}