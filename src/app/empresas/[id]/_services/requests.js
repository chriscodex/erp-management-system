import { patchData } from '@/lib/fetchData';
import { updateEmpresaClientUrl } from '@/lib/urls';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

import { connectDB } from '@/db/mongodb';
import { EmpresaService } from '@/backend/empresas/application/empresa.service';

export async function getEmpresaRequestServer(id) {
  try {
    await connectDB();
    const empresaService = new EmpresaService();

    const response = await empresaService.getEmpresaByData({ id });

    if (response?.status !== 200) {
      console.log('Error al obtener la empresa desde el servidor');
      return { empresa: null, status: response?.status };
    }
    const empresa = response?.payload;
    return { empresa: simplificadorParaClientComponent(empresa), status: 200 };
  } catch (error) {
    console.log(error);
  }
}

export async function updateEmpresaRequestClient(
  empresaId,
  empresaData,
  setLoading,
) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const updateEmpresaUrl = `${updateEmpresaClientUrl}/${empresaId}`;

      // Obtener los datos de la persona
      const response = await patchData(updateEmpresaUrl, empresaData);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar la empresa: ' + response.response?.data?.error,
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
