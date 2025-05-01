import { fetchData, deleteData, patchData, postData } from "@/lib/fetchData";
import {
  createClienteClientUrl,
  deleteClienteClientUrl,
  updateClienteClientUrl,
  searchClienteClientUrl,
} from "@/lib/urls";
import { ClienteService } from "@/backend/clientes/application/cliente.service";
import { delay, simplificadorParaClientComponent } from "@/lib/utils";
import { connectDB } from "@/db/mongodb";

export function searchClientePorDniOrRucClientRequest(
  identificador,
  setLoading
) {
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso

      await delay();

      if (identificador?.length !== 8 && identificador?.length !== 11) {
        setLoading(false);
        reject("Por favor, ingrese un DNI o RUC válido");
        return;
      }

      if (identificador?.length === 8) {
        const response = await fetchData(
          `${searchClienteClientUrl}?dni=${identificador}`
        );
        if (response?.status !== 200) {
          setLoading(false);
          reject("No se ha encontrado una persona con ese DNI");
          return;
        }
        setLoading(false);
        resolve(response?.data?.payload);
      }

      if (identificador?.length === 11) {
        const response = await fetchData(
          `${searchClienteClientUrl}?ruc=${identificador}`
        );
        if (response?.status !== 200) {
          setLoading(false);
          reject("No se ha encontrado una empresa con ese RUC");
          return;
        }
        setLoading(false);
        resolve(response?.data?.payload);
        console.log(response?.data?.payload);
      }
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}
export async function getAllClientesRequestServer() {
  try {
    await connectDB();
    const clienteService = new ClienteService();

    const response = await clienteService.getAllClientes();
    if (response?.status !== 200) {
      console.log("Error al obtener todos los clientes");
      return { clientes: [], status: response?.status };
    }
    const clientes = response?.payload;
    return {
      clientes: simplificadorParaClientComponent(clientes),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function createClienteRequestClient(clienteData, setLoading) {
  /* eslint-disable */

  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      let clienteDataPreformatted = {};

      if (clienteData?.tipo === "persona") {
        clienteDataPreformatted = {
          dni: clienteData?.identificador,
          nombres: clienteData?.nombres,
          apellidos: clienteData?.apellidos,
        };
      }
      if (clienteData?.tipo === "empresa") {
        clienteDataPreformatted = {
          ruc: clienteData?.identificador,
          razonSocial: clienteData?.razonSocial,
          representanteLegal: clienteData?.representanteLegal,
        };
      }

      const clienteObject = {
        tipo: clienteData?.tipo,
        datos: {
          ...clienteDataPreformatted,
          direccion: clienteData?.direccion,
          email: clienteData?.email,
          celular: clienteData?.celular,
        },
      };

      const response = await postData(createClienteClientUrl, clienteObject);
      if (response?.status !== 201) {
        setLoading(false);
        reject(
          "No se pudo crear el cliente: " + response.response?.data?.error
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

export async function updateClienteRequestClient(
  clienteData,
  setLoading
) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const updateClienteUrl = `${updateClienteClientUrl}/${clienteData?._id}`;

      // Obtener los datos de la persona
      const response = await patchData(updateClienteUrl, clienteData);
      if (response?.status !== 200) {
        setLoading(false);
        reject(
          "No se pudo actualizar el cliente: " + response.response?.data?.error
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

export async function deleteClienteRequestClient(clienteId) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteClienteClientUrl}/${clienteId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          "No se pudo eliminar el cliente: " + response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}
