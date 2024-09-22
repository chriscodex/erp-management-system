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
