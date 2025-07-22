import { patchData } from '@/lib/fetchData';
import { updateSucursalClientUrl } from '@/lib/urls';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

import { connectDB } from '@/db/mongodb';
import { SucursalService } from '@/backend/sucursales/application/sucursal.service';
import { UsersService } from '@/backend/users/application/users.service';

export async function getSucursalRequestServer(id) {
  try {
    await connectDB();
    const sucursalService = new SucursalService();

    const response = await sucursalService.getSucursalByData({ id });

    if (response?.status !== 200) {
      console.log('Error al obtener la sucursal desde el servidor');
      return { sucursal: null, status: response?.status };
    }
    const sucursal = response?.payload;
    return { sucursal: simplificadorParaClientComponent(sucursal), status: 200 };
  } catch (error) {
    console.log(error);
  }
}

export async function updateSucursalRequestClient(sucursalId, sucursalData, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const updateSucursalUrl = `${updateSucursalClientUrl}/${sucursalId}`;

      // Obtener los datos de la persona
      const response = await patchData(updateSucursalUrl, sucursalData);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar la sucursal: ' + response.response?.data?.error
        );
        return;
      }

      setLoading(false);
      resolve(response?.response?.data?.payload);
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}

export async function getUsersPerSucursalRequestServer(sucursalId) {
  try {
    await connectDB();
    const userService = new UsersService();

    const response = await userService.getUsersBySucursal(sucursalId);

    if (response?.status !== 200) {
      console.log('Error al obtener todos los usuarios');
      return { users: [], status: response?.status };
    }
    const users = response?.payload;
    return { users: simplificadorParaClientComponent(users), status: 200 };
  } catch (error) {
    console.error(error);
  }
}