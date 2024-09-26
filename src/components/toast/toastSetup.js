import { getDataByDni } from '@/lib/utils';

/* eslint-disable */
/**
 * Función para buscar una persona por DNI.
 * @param {string} dni - El DNI de la persona a buscar.
 * @param {function} setLoading - Función para manejar el estado de carga.
 * @returns {Promise} - Promesa que se resuelve con los datos de la persona.
 */
export function BusquedaPorDni (dni, setLoading) {
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Obtener los datos de la persona
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