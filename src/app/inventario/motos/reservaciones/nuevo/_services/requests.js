// import { marcaDataMock } from '@/db/mock-data';
import { fetchData, postData } from '@/lib/fetchData';
import {
  createReservacionClientUrl,
  searchClienteClientUrl,
} from '@/lib/urls';
import { delay } from '@/lib/utils';

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
        reject('Por favor, ingrese un DNI o RUC válido');
        return;
      }

      if (identificador?.length === 8) {
        const response = await fetchData(
          `${searchClienteClientUrl}?dni=${identificador}`
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
          `${searchClienteClientUrl}?ruc=${identificador}`
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

export async function createReservacionRequestClient(reservacionData, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      let clienteData = {};

      if (reservacionData?.cliente.tipo === 'persona') {
        clienteData = {
          dni: reservacionData?.identificador,
          nombres: reservacionData?.cliente.datos.nombres,
          apellidos: reservacionData?.cliente.datos.apellidos,
          celular: reservacionData?.cliente.datos.celular,
          email: reservacionData?.cliente.datos.email,
        };
      }
      if (reservacionData?.cliente.tipo === 'empresa') {
        clienteData = {
          ruc: reservacionData?.identificador,
          nombre: reservacionData?.cliente.datos.nombre,
          celular: reservacionData?.cliente.datos.celular,
          email: reservacionData?.cliente.datos.email,
        };
      }

      const reservacionObject = {
        pagoInicial: reservacionData?.pagoInicial,
        fechaLimite: reservacionData?.fechaLimite,
        comentario: reservacionData?.comentario,
        moto: {
          nombre: reservacionData?.moto?.nombre,
          descripcion: reservacionData?.moto?.descripcion,
          categoria:{
            nombre: reservacionData?.moto?.categoria?.nombre,
          },
          marca:{
            nombre: reservacionData?.moto?.marca?.nombre,
          }
        },
        cliente: {
          tipo: reservacionData?.cliente?.tipo,
          datos: clienteData,
        }
      };

      console.log('Lo que queremos ver jejeje', reservacionObject);
  
      const response = await postData(createReservacionClientUrl, reservacionObject);
      if (response?.status !== 201) {
        setLoading(false);
        reject(
          'No se pudo crear la reservacion: ' + response.response?.data?.error
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