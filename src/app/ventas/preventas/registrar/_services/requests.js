import { fetchData } from '@/lib/fetchData';
import {
  getMotoByCodeClientUrl,
  getProductByCodeClientUrl,
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

export function getProductByCodeClientRequest(code, setLoading) {
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso

      await delay();

      const responseProduct = await fetchData(
        `${getProductByCodeClientUrl}/?unit-code=${code}`
      );

      if (responseProduct?.status === 200 && responseProduct?.data?.payload) {
        setLoading(false);
        resolve(responseProduct?.data?.payload);
        return;
      }

      const responseMoto = await fetchData(
        `${getMotoByCodeClientUrl}/?code=${code}`
      );

      if (responseMoto?.status === 200 && responseMoto?.data?.payload) {
        setLoading(false);
        resolve(responseMoto?.data?.payload);
        return;
      }

      setLoading(false);
      reject('No se ha encontrado un producto o moto con ese código');
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}
