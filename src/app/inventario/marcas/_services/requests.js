import { getAllMarcasUrl, deleteMarcaUrl } from '@/lib/urls';
import { fetchData, deleteData } from '@/lib/fetchData';

export async function getAllMarcasRequest() {
  try {
    const response = await fetchData(getAllMarcasUrl);
    if (response?.status !== 200) {
      console.log('Error al obtener todas las marcas');
      return { marcas: [], status: 500 };
    }
    const marcas = response?.data?.payload;
    return { marcas, status: 200 };
  } catch (error) {
    console.error(error);
  }
}

/* eslint-disable */
export async function deleteMarca(id) {
  return new Promise(async (resolve, reject) => {
    try {
      // Simular tiempo de retraso
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const url = `${deleteMarcaUrl}/${id}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar la categoría: ' + response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}
/* eslint-enable */
