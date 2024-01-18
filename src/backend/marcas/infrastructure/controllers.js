import { MarcaService } from '@/backend/marcas/application/marca.service';
import { connectDB } from '@/db/mongodb';

const marcaService = new MarcaService();

export async function getMarcasController(request) {
  try {
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

    await connectDB();

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
    console.error(
      'Marca Controller: Error interno al obtener todas las marcas:',
      error.message
    );
    throw new Error(
      'Marca Controller: Error interno al obtener todas las marcas'
    );
  }
}

export async function getMarcaController(routeContext) {
  try {
    const { params } = routeContext;
    const { id } = params;

    await connectDB();

    const marca = await marcaService.getMarcaByData({ id });
    return marca;
  } catch (error) {
    console.error(
      'Marca Controller: Error interno buscando la marca:',
      error.message
    );
    throw new Error('Marca Controller: Error interno buscando la marca');
  }
}

export async function createMarcaController(request) {
  try {
    const body = await request.json();
    await connectDB();

    const createdMarca = await marcaService.createMarca(body);
    return createdMarca;
  } catch (error) {
    console.error(
      'Marca Controller: Error interno al crear una marca:',
      error.message
    );
    throw new Error('Marca Controller: Error interno al crear una marca');
  }
}

export async function updateMarcaController(request, routeContext) {
  try {
    const { params } = routeContext;
    const { id } = params;
    const body = await request.json();

    await connectDB();

    const result = await marcaService.updateMarca(id, body);
    return result;
  } catch (error) {
    console.error(
      'Marca Controller: Error interno actualizando la marca:',
      error.message
    );
    throw new Error('Marca Controller: Error interno actualizando la marca');
  }
}

export async function deleteMarcaController(routeContext) {
  try {
    const { params } = routeContext;
    const { id } = params;

    await connectDB();

    const marcaDeleted = await marcaService.deleteMarca(id);
    return marcaDeleted;
  } catch (error) {
    console.error(
      'Marca Controller: Error interno eliminando la marca:',
      error.message
    );
    throw new Error(
      'Marca Controller: Internal Server Error - deleteMarcaController'
    );
  }
}
