import { EmpresaService } from '@/backend/empresas/application/empresa.service';
import { connectDB } from '@/db/mongodb';

const empresaService = new EmpresaService();

export async function getAllEmpresasController() {
  try {
    await connectDB();
    const empresas = await empresaService.getAllEmpresas();
    return empresas;
  } catch (error) {
    console.error('Controller: Error obteniendo todas las empresas:', error);
    throw new Error(
      'Controller: Internal Server Error - getAllEmpresasController'
    );
  }
}
