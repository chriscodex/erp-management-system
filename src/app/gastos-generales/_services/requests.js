import {
  createGastoGeneralClientUrl,
  updateGastoGeneralClientUrl,
  deleteGastoGeneralClientUrl,
} from "@/lib/urls.js";
import { postData, patchData, deleteData } from "@/lib/fetchData";
import { delay, simplificadorParaClientComponent } from "@/lib/utils";

import { connectDB } from "@/db/mongodb";
import { GastoGeneralService } from "@/backend/gastosGenerales/application/gastoGeneral.service";

export async function getAllGastosGeneralesRequestServer() {
  try {
    await connectDB();
    const gastoGeneralService = new GastoGeneralService();

    const response = await gastoGeneralService.getAllGastosGenerales();
    if (response?.status !== 200) {
      console.log("Error al obtener todos los gastos generales");
      return { gastosGenerales: [], status: response?.status };
    }
    const gastosGenerales = response?.payload;
    return {
      gastosGenerales: simplificadorParaClientComponent(gastosGenerales),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function createGastoGeneralRequestClient(gastoData, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const gastoTest = {
        ...gastoData,
      };

      // Obtener los datos de la persona
      const response = await postData(createGastoGeneralClientUrl, gastoTest);
      if (response?.status !== 201) {
        setLoading(false);
        reject(
          "No se pudo crear el gasto general: " + response.response?.data?.error
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
export async function updateGastoGeneralRequestClient(gastoGeneralId, gastoGeneralData, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const updateGastoGeneralUrl = `${updateGastoGeneralClientUrl}/${gastoGeneralId}`;

      // Obtener los datos de la persona
      const response = await patchData(updateGastoGeneralUrl, gastoGeneralData);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          "No se pudo actualizar el gasto general: " + response.response?.data?.error
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
export async function deleteGastoGeneralRequestClient(gastoGeneralId) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteGastoGeneralClientUrl}/${gastoGeneralId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status === 500) {
        reject(
          "No se pudo eliminar el gasto general: " +
            response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}
