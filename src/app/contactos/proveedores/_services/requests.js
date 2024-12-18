import { deleteData, patchData, postData } from '@/lib/fetchData';
import {
  createProveedorClientUrl,
  deleteProveedorClientUrl,
  updateProveedorClientUrl,
} from '@/lib/urls';
import { ProveedorService } from '@/backend/proveedores/application/proveedor.service';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';
import { connectDB } from '@/db/mongodb';

export async function getAllProveedoresRequestServer() {
  try {
    await connectDB();
    const proveedorService = new ProveedorService();

    const response = await proveedorService.getAllProveedores();
    if (response?.status !== 200) {
      console.log('Error al obtener todas los proveedores');
      return { proveedores: [], status: response?.status };
    }
    const proveedores = response?.payload;
    return {
      proveedores: simplificadorParaClientComponent(proveedores),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function createProveedorRequestClient(proveedorData, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      // Obtener los datos de la persona
      const response = await postData(createProveedorClientUrl, proveedorData);
      if (response?.status !== 201) {
        setLoading(false);
        reject(
          'No se pudo crear el proveedor: ' + response.response?.data?.error
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

export async function updateProveedorRequestClient(
  proveedorId,
  proveedorData,
  setLoading
) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const updateProveedorUrl = `${updateProveedorClientUrl}/${proveedorId}`;

      // Obtener los datos de la persona
      const response = await patchData(updateProveedorUrl, proveedorData);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          'No se pudo actualizar el proveedor: ' +
            response.response?.data?.error
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

export async function deleteProveedorRequestClient(proveedorId) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteProveedorClientUrl}/${proveedorId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar el proveedor: ' + response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}
