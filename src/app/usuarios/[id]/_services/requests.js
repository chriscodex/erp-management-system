import { patchData } from '@/lib/fetchData';
import { updateUserClientUrl } from '@/lib/urls.js';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

import { connectDB } from '@/db/mongodb';
import { UsersService } from '@/backend/users/application/users.service';
import { VentaHistoricaService } from "@/backend/ventas/application/ventaHistorica.service";

export async function getUserRequestServer(userId) {
  try {
    await connectDB();
    const userService = new UsersService();

    const response = await userService.getUserByData({ id: userId });

    if (response?.status !== 200) {
      console.log('Error al obtener el usuario desde el cliente');
      return { user: null, status: response?.status };
    }
    const user = response?.payload;

    return { user: simplificadorParaClientComponent(user), status: 200 };
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserRequestClient(userId, userData, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const updateUserUrl = `${updateUserClientUrl}/${userId}`;

      // Obtener los datos de la persona
      const response = await patchData(updateUserUrl, userData);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar el usuario: ' + response.response?.data?.error
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


export async function getVentasHistoricasRequestServer(userId) {
  try {
    await connectDB();
    const ventasHistoricasService = new VentaHistoricaService();

    const response = await ventasHistoricasService.getVentasHistoricasByUser(
      userId
    );

    if (response?.status !== 200) {
      console.log("Error al obtener las ventas históricas del vendedor");
      return { ventasHistoricas: [], status: response?.status };
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
