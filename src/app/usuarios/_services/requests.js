import { deleteUserClientUrl } from '@/lib/urls.js';
import { deleteData } from '@/lib/fetchData';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

import { connectDB } from '@/db/mongodb';
import { UsersService } from '@/backend/users/application/users.service';
import { SucursalService } from '@/backend/sucursales/application/sucursal.service';

export async function getAllUsersRequestServer() {
  try {
    await connectDB();
    const userService = new UsersService();

    const response = await userService.getAllUsers();
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

export async function deleteUserRequestClient(userId) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteUserClientUrl}/${userId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status === 500) {
        reject(
          'No se pudo eliminar el usuario: ' + response.response?.data?.error,
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}

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

    return {
      sucursales: simplificadorParaClientComponent(sucursales),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}
