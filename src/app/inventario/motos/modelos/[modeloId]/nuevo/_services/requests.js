import { AlmacenService } from '@/backend/almacenes/application/almacen.service';
import { ProveedorService } from '@/backend/proveedores/application/proveedor.service';
import { connectDB } from '@/db/mongodb';
import { postData } from '@/lib/fetchData';
import { createMotoClientUrl } from '@/lib/urls';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

export async function createUnidadMotoRequestClient(motoData, setLoading) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso para pruebas en la UI
      await delay();

      const motoObj = {
        ...motoData,
        estado: {
          titulo: motoData?.estadoTitle,
          observaciones: motoData?.observacionesEstado,
        },
      };
      delete motoObj?.estadoTitle;
      delete motoObj?.estadoObservaciones;

      const response = await postData(createMotoClientUrl, motoObj);
      if (response?.status !== 201) {
        setLoading(false);
        reject('No se pudo crear la moto: ' + response.response?.data?.error);
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

export async function getAllProveedoresByDataForMotosRequestServer(
  proveedorData,
) {
  try {
    await connectDB();
    const proveedorService = new ProveedorService();

    const response =
      await proveedorService.getAllProveedoresByData(proveedorData);
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

export async function getAllAlmacenesByDataForMotosRequestServer(almacenData) {
  try {
    await connectDB();
    const almacenService = new AlmacenService();

    const response = await almacenService.getAllAlmacenesByData(almacenData);

    if (response?.status !== 200) {
      console.log('Error al obtener todos los almacenes');
      return { almacenes: [], status: response?.status };
    }
    const almacenes = response?.payload;
    return {
      almacenes: simplificadorParaClientComponent(almacenes),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}
