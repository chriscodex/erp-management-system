import { getDataByDni } from '@/app/usuarios/_services/requests';

/* eslint-disable */
export function BusquedaPorDni (dni, setLoading) {
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await getDataByDni(dni);
      if (response?.status !== 200) {
        setLoading(false);
        reject('No se ha encontrado una persona con ese DNI');
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
/* eslint-enable */