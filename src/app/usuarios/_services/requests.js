import { usersUrl } from '@/app/usuarios/_services/urls';
import { getData } from '@/lib/fetchData';
import { FormatearMayusculasAMinusculas } from '@/lib/formateador';

const API_URL = '/api/external/dni/';

export async function getAllUsers() {
  try {
    return getData(usersUrl);
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
    const { nombres, apellidoPaterno, apellidoMaterno } = await getData(
      `${API_URL + dni}`
    );
    const nombresFormateados = FormatearMayusculasAMinusculas(nombres);
    const apellidosFormateados = FormatearMayusculasAMinusculas(
      `${apellidoPaterno} ${apellidoMaterno}`
    );
    return { nombresFormateados, apellidosFormateados };
  } catch (error) {
    console.log(error);
  }
}

// async function getUser(userId) {
//   try {

//   } catch (error) {

//   }
// }
