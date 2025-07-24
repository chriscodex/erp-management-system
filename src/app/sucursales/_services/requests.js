import { deleteSucursalClientUrl } from '@/lib/urls';
import { deleteData } from '@/lib/fetchData';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

import { connectDB } from '@/db/mongodb';
import { SucursalService } from '@/backend/sucursales/application/sucursal.service';

export async function getAllSucursalesRequestServer() {
  try {
    await connectDB();
    const sucursalService = new SucursalService();

    const response = await sucursalService.getAllSucursales();

    if (response?.status !== 200) {
      console.log('Error al obtener todas las sucursales');
      return { sucursales: [], status: 500 };
    }
    const sucursales = response?.payload;

    return { sucursales: simplificadorParaClientComponent(sucursales), status: 200 };
  } catch (error) {
    console.error(error);
  }
}

export async function deleteSucursalRequestClient(sucursalId) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteSucursalClientUrl}/${sucursalId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar la sucursal: ' + response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}
