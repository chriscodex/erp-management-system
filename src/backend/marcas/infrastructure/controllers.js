import { MarcaService } from '@/backend/marcas/application/marca.service';
import { connectDB } from '@/db/mongodb';

const marcaService = new MarcaService();

export async function getMarcasController(request) {
  try {
    await connectDB();

    // Extrae los query parameters de la URL
    const { searchParams } = new URL(request.url);
    const segmentId = searchParams.get('segmentId');
    const segmentName = searchParams.get('segmentName');

    if (segmentId !== null && segmentName !== null) {
      return {
        payload:
          'No se pueden filtrar por segmentId y segmentName al mismo tiempo',
        status: 400,
      };
    }

    let result;
    if (segmentId !== null || segmentName !== null) {
      result = await marcaService.getMarcaBySegmentData({
        id: segmentId,
        nombre: segmentName,
      });
    } else {
      result = await marcaService.getAllMarcas();
    }
    return result;
  } catch (error) {
    console.error('Controller: Error obteniendo todas las marcas:', error);
    throw new Error(
      'Controller: Internal Server Error - getAllMarcasController'
    );
  }
}

export async function getMarcasBySegmentDataController(segmentData) {
  try {
    await connectDB();
    const marcasFiltered = await marcaService.getMarcaBySegmentData(
      segmentData
    );
    return marcasFiltered;
  } catch (error) {
    console.error(
      'Controller: Error obteniendo las marcas filtradas por segmento:',
      error
    );
    throw new Error(
      'Controller: Internal Server Error - getMarcasBySegmentIdController'
    );
  }
}

export async function getMarcaByDataController(marcaData) {
  try {
    await connectDB();
    const marca = await marcaService.getMarcaByData(marcaData);
    return marca;
  } catch (error) {
    console.error('Controller: Error buscando la marca:', error);
    throw new Error('Controller: Internal Server Error - getMarcaController');
  }
}

export async function createMarcaController(marcaData) {
  try {
    await connectDB();

    /* Responses { payload, status} */
    const createdMarca = await marcaService.createMarca(marcaData);
    return createdMarca;
  } catch (error) {
    console.error('Controller: Error al crear una marca:', error);
    throw new Error(
      'Controller: Internal Server Error - createMarcaController'
    );
  }
}

export async function updateMarcaController(id, marca) {
  try {
    await connectDB();
    const updatedMarca = await marcaService.updateMarca(id, marca);
    return updatedMarca;
  } catch (error) {
    console.error('Controller: Error actualizando la marca:', error);
    throw new Error(
      'Controller: Internal Server Error - updateMarcaController'
    );
  }
}

export async function deleteMarcaController(id) {
  try {
    await connectDB();
    const marcaDeleted = await marcaService.deleteMarca(id);
    return marcaDeleted;
  } catch (error) {
    console.error('Controller: Error eliminando la marca:', error);
    throw new Error(
      'Controller: Internal Server Error - deleteMarcaController'
    );
  }
}
