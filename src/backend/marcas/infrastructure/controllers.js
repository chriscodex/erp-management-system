import { MarcaService } from '@/backend/marcas/application/marca.service';
import { connectDB } from '@/db/mongodb';

const marcaService = new MarcaService();

export async function getAllMarcasController() {
  try {
    await connectDB();
    const marcas = await marcaService.getAllMarcas();
    return marcas;
  } catch (error) {
    console.error('Controller: Error fetching marcas:', error);
    throw new Error(
      'Controller: Internal Server Error - getAllMarcasController'
    );
  }
}

export async function getMarcaController(id) {
  try {
    await connectDB();
    const marcaData = await marcaService.getMarca(id);
    return marcaData;
  } catch (error) {
    console.error('Controller: Error buscando una marca:', error);
    throw new Error('Controller: Internal Server Error - getMarcaController');
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
