import { ClienteService } from '@/backend/clientes/application/cliente.service';
import {
  getDataByDniFromExternalApi,
  getDataByRucFromExternalApi,
} from '@/backend/shared/externalApi';

import { connectDB } from '@/db/mongodb';

// Crear la instancia del servicio
const clienteService = new ClienteService(
  getDataByDniFromExternalApi,
  getDataByRucFromExternalApi
);

export async function getClientByDniOrRucController(request) {
  try {
    // Extrae los query parameters de la URL
    const { searchParams } = new URL(request.url);
    const dni = searchParams.get('dni');
    const ruc = searchParams.get('ruc');

    if (dni === null && ruc === null) {
      return {
        payload: 'Debe proporcionar un DNI o RUC',
        status: 400,
      };
    }

    if (dni !== null && ruc !== null) {
      return {
        payload: 'Debe proporcionar solo un DNI o RUC',
        status: 400,
      };
    }

    let identificador = '';
    if (!dni) identificador = ruc;
    if (!ruc) identificador = dni;

    await connectDB();

    const clienteData = await clienteService.getCliente(identificador);
    return clienteData;
  } catch (error) {
    console.error(
      'Cliente Controller: Error interno al obtener los datos del cliente:',
      error.message
    );
    throw new Error(
      'Cliente Controller: Error interno al obtener los datos del cliente'
    );
  }
}
