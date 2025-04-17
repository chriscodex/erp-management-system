import { connectDB } from '@/db/mongodb';
import { deleteData } from '@/lib/fetchData';
import { deleteModeloClientUrl } from '@/lib/urls';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

import { MarcaService } from '@/backend/marcas/application/marca.service';
import { ModeloService } from '@/backend/modelos/application/modelo.service';
import { CategoryService } from '@/backend/categorias/application/category.service';


export async function getAllModelosRequestServer() {
  try {
    await connectDB();
    const modeloService = new ModeloService();

    const response = await modeloService.getAllModelos();

    if (response?.status !== 200) {
      console.log('Error al obtener todos los modelos');
      return { modelos: [], status: 500 };
    }
    const modelos = response?.payload;
    return {
      modelos: simplificadorParaClientComponent(modelos),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function deleteModeloRequestClient(modeloId) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteModeloClientUrl}/${modeloId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar el modelo: ' + response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getMarcasBySegmentDataForModelosRequestServer(
  marcaAndSegmentData
) {
  try {
    await connectDB();
    const marcaService = new MarcaService();

    const response = await marcaService.getMarcasBySegmentData(
      marcaAndSegmentData
    );

    if (response?.status !== 200) {
      console.log('Error al obtener marcas por segmento');
      return { marcas: [], status: response?.status };
    }
    const marcas = response?.payload;
    return { marcas: simplificadorParaClientComponent(marcas), status: 200 };
  } catch (error) {
    console.error(error);
  }
}

export async function getCategoriesBySegmentDataForModelosRequestServer(
  categoryAndSegmentData
) {
  try {
    await connectDB();
    const categoryService = new CategoryService();

    const response = await categoryService.getCategoriesBySegmentData(
      categoryAndSegmentData
    );

    if (response?.status !== 200) {
      console.log('Error al obtener la categorías por segmento');
      return { categories: [], status: response?.status };
    }
    const categories = response?.payload;
    return {
      categories: simplificadorParaClientComponent(categories),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}
