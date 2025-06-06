import { delay } from '@/lib/utils';

import {
  deleteOrdenDeServicioClientUrl,
  finalizarOrdenDeServicioClientUrl,
  deleteUnitFromProductClientUrl,
  updateOrdenDeServicioClientUrl,
} from '@/lib/urls';
import { deleteData, postData, patchData } from '@/lib/fetchData';

export async function deleteOrdenDeServicioRequestClient(ordenDeServicioId) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteOrdenDeServicioClientUrl}/${ordenDeServicioId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar la orden de servicio: ' + response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}

export async function finalizarOrdenDeServicioRequestClient(ordenDeServicioId) {
  /* eslint-disable */

  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${finalizarOrdenDeServicioClientUrl}/${ordenDeServicioId}/finalizar`;

      // Obtener los datos de la persona
      const response = await postData(url);

      if (response?.status !== 201) {
        reject(
          'No se pudo eliminar la orden de servicio: ' + response.response?.data?.error
        );
        return;
      }

      resolve(response?.data?.payload);

    } catch (error) {
      reject(error);
    }
  });
}

export async function deleteUnitProductRequestClient(ordenDeServicioData, productId, unitProductId) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteUnitFromProductClientUrl}/${productId}/unit-product/${unitProductId}`;

      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar el producto: ' + response.response?.data?.error
        );
        return;
      }

      //Actualizar en BD
      const ordenActualizada = {
        ...ordenDeServicioData,
        productos: ordenDeServicioData.productos.map((producto) => {
          if (producto.unitId === unitProductId) {
            return {
              ...producto,
              inventario: "eliminado",
            };
          }
          return producto;
        }),
        isDelete: true,
      };


      const updateOrdenDeServicioUrl = `${updateOrdenDeServicioClientUrl}/${ordenDeServicioData?._id}`;

      // Obtener los datos de la orden de servicio
      const updateResponse = await patchData(updateOrdenDeServicioUrl, ordenActualizada);

      if (updateResponse?.status !== 200) {
        reject(
          'No se pudo actualizar la orden de servicio: ' + response.response?.data?.error
        );
        return;
      }
      // resolve(response?.response?.data?.payload);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}