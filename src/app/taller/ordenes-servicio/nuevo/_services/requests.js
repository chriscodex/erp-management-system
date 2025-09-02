import { connectDB } from '@/db/mongodb';
import { fetchData, postData } from '@/lib/fetchData';
import {
  createOrdenDeServicioClientUrl,
  searchClienteClientUrl,
} from '@/lib/urls';
import { UsersService } from '@/backend/users/application/users.service';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

export function searchClientePorDniOrRucClientRequest(
  identificador,
  setLoading,
) {
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso

      await delay();

      if (identificador?.length !== 8 && identificador?.length !== 11) {
        setLoading(false);
        reject('Por favor, ingrese un DNI o RUC válido');
        return;
      }

      if (identificador?.length === 8) {
        const response = await fetchData(
          `${searchClienteClientUrl}?dni=${identificador}`,
        );
        if (response?.status !== 200) {
          setLoading(false);
          reject('No se ha encontrado una persona con ese DNI');
          return;
        }
        setLoading(false);
        resolve(response?.data?.payload);
      }

      if (identificador?.length === 11) {
        const response = await fetchData(
          `${searchClienteClientUrl}?ruc=${identificador}`,
        );
        if (response?.status !== 200) {
          setLoading(false);
          reject('No se ha encontrado una empresa con ese RUC');
          return;
        }
        setLoading(false);
        resolve(response?.data?.payload);
      }
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}

export async function getAllMecanicosRequestServer() {
  try {
    await connectDB();
    const userService = new UsersService();

    const response = await userService.getAllMecanicos();

    if (response?.status !== 200) {
      console.log('Error al obtener todos los mecanicos');
      return { mecanicos: [], status: 500 };
    }
    const mecanicos = response?.payload;
    return {
      mecanicos: simplificadorParaClientComponent(mecanicos),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function createOrdenDeServicioRequestClient(
  ordenDeServicioData,
  setLoading,
) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      let mecanicosFormated = [];

      // Formatear los mecánicos
      if (ordenDeServicioData?.mecanicos?.length > 0) {
        mecanicosFormated = ordenDeServicioData?.mecanicos?.map((mecanico) => {
          const mecanicoObject = {
            ...mecanico,
            userId: mecanico._id,
          };
          delete mecanicoObject?._id;
          delete mecanicoObject?.celular;
          delete mecanicoObject?.direccion;
          delete mecanicoObject?.password;
          delete mecanicoObject?.fechaIngreso;
          delete mecanicoObject?.createdAt;
          delete mecanicoObject?.updatedAt;
          delete mecanicoObject?.__v;
          delete mecanicoObject?.numeracion;
          delete mecanicoObject?.rol;
          delete mecanicoObject?.estado;

          return mecanicoObject;
        });
      }

      let clienteData = {};
      if (ordenDeServicioData?.tipo === 'persona') {
        clienteData = {
          dni: ordenDeServicioData?.identificador,
          nombres: ordenDeServicioData?.nombres,
          apellidos: ordenDeServicioData?.apellidos,
          direccion:
            ordenDeServicioData?.direccion?.trim() === ''
              ? undefined
              : ordenDeServicioData?.direccion?.trim(),
          email:
            ordenDeServicioData?.email?.trim() === ''
              ? undefined
              : ordenDeServicioData?.email?.trim(),
          celular:
            ordenDeServicioData?.celular?.trim() === ''
              ? undefined
              : ordenDeServicioData?.celular?.trim(),
        };
      }
      if (ordenDeServicioData?.tipo === 'empresa') {
        clienteData = {
          ruc: ordenDeServicioData?.identificador,
          razonSocial: ordenDeServicioData?.razonSocial,
          representanteLegal: ordenDeServicioData?.representanteLegal,
          direccion: ordenDeServicioData?.direccion?.trim(),
          email:
            ordenDeServicioData?.email?.trim() === ''
              ? undefined
              : ordenDeServicioData?.email?.trim(),
          celular:
            ordenDeServicioData?.celular?.trim() === ''
              ? undefined
              : ordenDeServicioData?.celular?.trim(),
        };
      }

      let motoData = {
        nombre:
          ordenDeServicioData?.nombre?.trim() === ''
            ? undefined
            : ordenDeServicioData?.nombre?.trim(),
        vin:
          ordenDeServicioData?.vin?.trim() === ''
            ? undefined
            : ordenDeServicioData?.vin?.trim(),
        placa:
          ordenDeServicioData?.placa?.trim() === ''
            ? undefined
            : ordenDeServicioData?.placa?.trim(),
        descripcion:
          ordenDeServicioData?.descripcion?.trim() === ''
            ? undefined
            : ordenDeServicioData?.descripcion?.trim(),
        categoria:
          ordenDeServicioData?.categoria?.trim() === ''
            ? undefined
            : ordenDeServicioData?.categoria?.trim(),
        marca:
          ordenDeServicioData?.marca?.trim() === ''
            ? undefined
            : ordenDeServicioData?.marca?.trim(),
      };

      const ordenDeServicioObject = {
        cliente: {
          tipo: ordenDeServicioData?.tipo,
          datos: clienteData,
        },
        moto: {
          ...motoData,
        },
        pago: {
          montoAdelanto: ordenDeServicioData?.montoAdelanto,
        },
        mecanicos: mecanicosFormated,
        fechaIngreso: ordenDeServicioData?.fechaIngreso,
        origenServicio: ordenDeServicioData?.origenServicio,
        tipoServicio: ordenDeServicioData?.tipoServicio,
        comentarios:
          ordenDeServicioData?.comentarios?.trim() === ''
            ? undefined
            : ordenDeServicioData?.comentarios?.trim(),
      };

      // Obtener los datos de la persona
      const response = await postData(
        createOrdenDeServicioClientUrl,
        ordenDeServicioObject,
      );

      if (response?.status !== 201) {
        setLoading(false);
        reject(
          'No se pudo crear la orden de servicio: ' +
            response.response?.data?.error,
        );
        return;
      }

      setLoading(false);
      console.log('response', response);
      resolve(response?.data?.payload);
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}
