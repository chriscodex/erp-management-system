import { delay, simplificadorParaClientComponent } from '@/lib/utils';

import { createVentaClientUrl, deletePreventaClientUrl } from '@/lib/urls';
import { deleteData, postData } from '@/lib/fetchData';

import { EmpresaService } from '@/backend/empresas/application/empresa.service';
import { connectDB } from '@/db/mongodb';

export async function deletePreventaRequestClient(preventaId) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deletePreventaClientUrl}/${preventaId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar la preventa: ' + response.response?.data?.error,
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}

export async function createVentaRequestClient(preventaId) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      // Simular tiempo de retraso
      await delay();

      const response = await postData(createVentaClientUrl, { id: preventaId });
      if (response?.status !== 201) {
        reject('No se pudo crear la venta: ' + response.response?.data?.error);
        return;
      }

      resolve(response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getFirstEmpresaForCotizacionRequestServer() {
  try {
    await connectDB();
    const empresaService = new EmpresaService();

    const response = await empresaService.getFirstEmpresa();

    if (response?.status !== 200) {
      console.log('Error al obtener la primera empresa');
      return { empresas: [], status: 500 };
    }
    const empresa = response?.payload;

    return {
      empresa: simplificadorParaClientComponent(empresa),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}
