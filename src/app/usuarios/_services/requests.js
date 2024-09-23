import { getAllUsersUrl, getDataByDniUrl } from '@/app/usuarios/_services/urls';
import { fetchData } from '@/lib/fetchData';

export async function getAllUsers() {
  try {
    return fetchData(getAllUsersUrl);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Obtiene datos de una persona por su DNI, formatea los nombres y apellidos, y devuelve el resultado.
 * @param {string} dni - El número de DNI de la persona. Por defecto, es una cadena vacía.
 * @returns {Object} - Un objeto con los nombres y apellidos formateados en mayúscula y minúscula.
 * La función realiza una solicitud a una API externa para obtener la información personal correspondiente al DNI proporcionado, luego aplica formato a los nombres y apellidos para que estén correctamente capitalizados (primera letra en mayúscula, el resto en minúscula).
 */
export async function getDataByDni(dni = '') {
  try {
    const userData = await fetchData(
      `${getDataByDniUrl}?dni=${dni}`
    );

    console.log(userData);

    return userData;
  } catch (error) {
    console.log(error);
  }
}

// async function getUser(userId) {
//   try {

//   } catch (error) {

//   }
// }
