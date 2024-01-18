import { EmpresaService } from '@/backend/empresas/application/empresa.service';
import { connectDB } from '@/db/mongodb';

const empresaService = new EmpresaService();

export async function getEmpresasController() {
  try {
    await connectDB();
    const empresas = await empresaService.getAllEmpresas();
    return empresas;
  } catch (error) {
    console.error(
      'Empresa Controller: Error interno al obtener todas las empresas:',
      error.message
    );
    throw new Error(
      'Empresa Controller: Error interno al obtener todas las empresas'
    );
  }
}
