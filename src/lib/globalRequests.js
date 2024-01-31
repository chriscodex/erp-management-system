import { fetchData } from '@/lib/fetchData';
import { getSearchedUserClientUrl } from './urls';
import { delay } from '@/lib/utils';

/**
 * Función para buscar una persona por DNI.
 * @param {string} dni - El DNI de la persona a buscar.
 * @param {function} setLoading - Función para manejar el estado de carga.
 * @returns {Promise} - Promesa que se resuelve con los datos de la persona.
 */
export function buscarPorDniClientRequest(dni, setLoading) {
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso

      await delay();

      // Obtener los datos de la persona
      const response = await fetchData(
        `${getSearchedUserClientUrl}?dni=${dni}`
      );

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
