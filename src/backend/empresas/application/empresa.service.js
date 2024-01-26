import { EmpresaRepository } from '@/backend/empresas/domain/repositories/empresaRepository';

export class EmpresaService {
  constructor() {
    this.empresaRepository = new EmpresaRepository();
  }
  async getAllEmpresas() {
    try {
      const empresas = await this.empresaRepository.getAllEmpresas();

      if (empresas.length === 0) {
        console.log('Empresa Service: No se encontraron empresas');
        return {
          status: 200,
          payload: [],
        };
      }

      console.log('Empresa Service: Empresas encontradas');
      return {
        status: 200,
        payload: empresas,
      };
    } catch (error) {
      console.error(
        `Empresa Service: Error interno al buscar todas las empresas: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
