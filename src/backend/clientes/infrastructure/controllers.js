import { ClienteService } from '@/backend/clientes/application/cliente.service';
import {
  getDataByDniFromExternalApi,
  getDataByRucFromExternalApi,
} from '@/backend/shared/externalApi';
import { connectDB } from '@/db/mongodb';

// const clienteService = new ClienteService();

const clienteService = new ClienteService(
  getDataByDniFromExternalApi,
  getDataByRucFromExternalApi,
);

export async function getClientesRequestHandlerController(request) {
  const { searchParams } = new URL(request.url);
  const dni = searchParams.get('dni');
  const ruc = searchParams.get('ruc');

  if (dni || ruc) {
    return await getClienteByDataController(request);
  }

  return await getAllClientesController();
}

export async function getAllClientesController() {
  try {
    await connectDB();
    const clientes = await clienteService.getAllClientes();
    return clientes;
  } catch (error) {
    console.error(
      'Cliente Controller: Error interno al obtener todos las clientes:',
      error.message,
    );
    throw new Error(
      'Cliente Controller: Error interno al obtener todos las clientes',
    );
  }
}

export async function getClienteByDataController(contextRoute) {
  try {
    const { searchParams } = new URL(contextRoute.url);

    const id = searchParams.get('id');
    const dni = searchParams.get('dni');
    const ruc = searchParams.get('ruc');

    if ([id, dni, ruc].filter(Boolean).length === 0) {
      return {
        payload: 'Debe proporcionar un ID, DNI o RUC',
        status: 400,
      };
    }

    if ([id, dni, ruc].filter(Boolean).length > 1) {
      return {
        payload: 'Debe proporcionar solo un ID, DNI o RUC, no varios a la vez',
        status: 400,
      };
    }

    let query = {};

    if (id) {
      query = { _id: id };
    } else if (dni) {
      query = { dni: dni };
    } else if (ruc) {
      query = { ruc: ruc };
    }

    await connectDB();

    const cliente = await clienteService.getClienteByData(query);

    return cliente;
  } catch (error) {
    console.error(
      'Cliente Controller: Error interno al obtener el cliente',
      error.message,
    );
    throw new Error('Cliente Controller: Error interno al obtener el cliente');
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
      'Cliente Controller: Error interno al crear el cliente',
      error.message,
    );
    throw new Error('Cliente Controller: Error interno al crear el cliente');
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
      'Cliente Controller: Error interno al actualizar el cliente',
      error.message,
    );
    throw new Error(
      'Cliente Controller: Error interno al actualizar el cliente',
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
      'Cliente Controller: Error interno eliminando el cliente',
      error.message,
    );
    throw new Error('Cliente Controller: Error interno eliminando el cliente');
  }
}
