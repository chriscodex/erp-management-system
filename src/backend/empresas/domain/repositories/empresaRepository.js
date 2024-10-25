import { Empresa } from '@/backend/empresas/domain/models/empresa';

export class EmpresaRepository {
  constructor() {
    this.empresaModel = Empresa;
  }
  async getAllEmpresas() {
    try {
      const empresas = await this.empresaModel.find();

      if (empresas.length === 0) {
        console.log('Empresa Repository: No se encontraron empresas');
        return null;
      }

      console.log('Empresa Repository: Empresas encontradas');
      return empresas;
    } catch (error) {
      console.error(
        `Empresa Repository: Error al buscar todas las empresas: ${error.message}`
      );
      throw new Error(`Error al buscar todas las empresas: ${error.message}`);
    }
  }
}