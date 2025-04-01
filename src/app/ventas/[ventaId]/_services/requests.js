import { EmpresaService } from '@/backend/empresas/application/empresa.service';
import { connectDB } from '@/db/mongodb';
import { deleteData } from '@/lib/fetchData';
import { deleteVentaClientUrl } from '@/lib/urls';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

export async function deleteVentaRequestClient(ventaId) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteVentaClientUrl}/${ventaId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar la venta: ' + response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getAllEmpresasForComprobanteVentaRequestServer() {
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
