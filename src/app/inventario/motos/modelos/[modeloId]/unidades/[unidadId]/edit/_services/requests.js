import { ModeloService } from '@/backend/modelos/application/modelo.service';
import { connectDB } from '@/db/mongodb';
import { patchData } from '@/lib/fetchData';
import { updateMotoClientUrl } from '@/lib/urls';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

export async function updateMotoRequestClient(motoId, motoData, setLoading) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const updateMotoUrl = `${updateMotoClientUrl}/${motoId}`;

      // Obtener los datos de la persona
      const response = await patchData(updateMotoUrl, motoData);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar los datos de la moto: ' +
            response.response?.data?.error,
        );
        return;
      }

      setLoading(false);
      resolve(response?.data?.payload);
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}

export async function getAllModelosForUpdateMotoFormRequestServer() {
  try {
    await connectDB();
    const modeloService = new ModeloService();

    const response = await modeloService.getAllModelosUnpopulated();

    if (response?.status !== 200) {
      console.log('Error al obtener todos los modelos');
      return { modelos: [], status: 500 };
    }
    const modelos = response?.payload;
    return {
      modelos: simplificadorParaClientComponent(modelos),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}
