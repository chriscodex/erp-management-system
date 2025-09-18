import { deleteEmpresaClientUrl } from '@/lib/urls';
import { deleteData } from '@/lib/fetchData';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

import { connectDB } from '@/db/mongodb';
import { EmpresaService } from '@/backend/empresas/application/empresa.service';

export async function getAllEmpresasRequestServer() {
  try {
    await connectDB();
    const empresaService = new EmpresaService();

    const response = await empresaService.getAllEmpresas();

    if (response?.status !== 200) {
      console.log('Error al obtener todas las empresas');
      return { empresas: [], status: 500 };
    }
    const empresas = response?.payload;

    return {
      empresas: simplificadorParaClientComponent(empresas),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function deleteEmpresaRequestClient(empresaId) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteEmpresaClientUrl}/${empresaId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar la empresa: ' + response.response?.data?.error,
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}
