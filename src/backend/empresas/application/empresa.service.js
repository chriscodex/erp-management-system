import { EmpresaRepository } from '@/backend/empresas/domain/repositories/empresaRepository';
import { createEmpresaSchema } from '@/backend/empresas/application/validations/createEmpresaSchema';
import { updateEmpresaSchema } from '@/backend/empresas/application/validations/updateEmpresaSchema';

export class EmpresaService {
  constructor() {
    this.empresaRepository = new EmpresaRepository();
  }
  async getAllEmpresas() {
    try {
      const empresas = await this.empresaRepository.getAllEmpresas();

      if (empresas?.length === 0) {
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
  async getEmpresaByData(empresaData) {
    try {
      const empresaFound = await this.empresaRepository.getEmpresaByData(empresaData);

      if (!empresaFound) {
        console.log('Empresa Service: La empresa no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Empresa Service: La empresa existe');
      return {
        status: 200,
        payload: empresaFound,
      };
    } catch (error) {
      console.error(
        `Empresa Service: Error interno al buscar una empresa: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async createEmpresa(empresa) {
    try {

      const empresaValidated = createEmpresaSchema.safeParse(empresa);

      if (!empresaValidated.success) {
        console.log(
          'Empresa Service: Error de validación de schema de empresa al crear'
        );
        return {
          status: 400,
          payload: empresaValidated.error.issues,
        };
      }

      // Validar si la empresa
      const empresaFound = await this.empresaRepository.getEmpresaByData(empresa);
      if (empresaFound) {
        console.log('Empresa Service: La empresa ya existe');
        return {
          status: 409,
          payload: 'La empresa ya existe',
        };
      }

      // Crear el objeto de empresa
      const empresaObject = {
        ...empresa,
        estado: 'activo',
      };

      // Crear la empresa
      const empresaCreated = await this.empresaRepository.createEmpresa(empresaObject);

      const empresaCreatedObject = empresaCreated.toObject();

      console.log('Empresa Service: Empresa creada correctamente');
      return {
        status: 201,
        payload: empresaCreatedObject,
      };
    } catch (error) {
      console.error(
        `Empresa Service: Error interno al crear una empresa: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async updateEmpresa(empresaId, empresaData) {
    try {
      // Validar los datos de la empresa enviada con el schema
      const empresaValidated = updateEmpresaSchema.safeParse(empresaData);

      if (!empresaValidated.success) {
        console.log(
          'Empresa Service: Error de validación de schema de empresa al actualizar'
        );
        return {
          status: 400,
          payload: empresaValidated.error.issues,
        };
      }

      // Validar si una empresa con el mismo RUC existe
      if (empresaData.ruc) {
        const empresaFound = await this.empresaRepository.getEmpresaByData(empresaData);
        if (empresaFound && empresaFound?._id !== empresaId) {
          console.log('Empresa Service: Una empresa con el mismo ruc ya existe');
          return {
            status: 409,
            payload: 'Una empresa con el mismo ruc ya existe',
          };
        }
      }

      const empresaUpdated = await this.empresaRepository.updateEmpresa(
        empresaId,
        empresaData
      );

      if (!empresaUpdated) {
        console.log('Empresa Service: La empresa no existe');
        return {
          status: 200,
          payload: empresaUpdated,
        };
      }

      console.log('Empresa Service: Empresa actualizada correctamente');
      return {
        status: 200,
        payload: empresaUpdated,
      };
    } catch (error) {
      console.error(
        `Empresa Service: Error interno al actualizar una empresa: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deleteEmpresa(empresaId) {
    try {
      const empresaDeleted = await this.empresaRepository.deleteEmpresa(empresaId);

      if (!empresaDeleted) {
        console.log('Empresa Service: La empresa no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Empresa Service: Empresa eliminada correctamente');
      return {
        status: 204,
        payload: empresaDeleted,
      };
    } catch (error) {
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}

