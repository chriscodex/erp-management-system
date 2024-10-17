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
