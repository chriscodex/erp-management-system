import mongoose from 'mongoose';
import { Empresa } from '@/backend/empresas/domain/models/empresa';

export class EmpresaRepository {
  constructor() {
    this.empresaModel = Empresa;
  }

  async getAllEmpresas() {
      try {
        const empresas = await Empresa.find();
  
        if (empresas?.length === 0) {
          console.log('Empresa Repository: No se encontraron empresas');
          return [];
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
    async getEmpresaByData(empresaData) {
      try {
        if (!empresaData) {
          console.log('Empresa Repository: Empresa no proporcionada');
          return null;
        }
  
        const filter = {};
  
        if (empresaData.id) {
          filter._id = new mongoose.Types.ObjectId(empresaData.id);
        }
  
        if (empresaData.ruc) {
          filter.ruc = empresaData.ruc;
        }
  
        const empresaFound = await Empresa.findOne(filter).select('-password');
  
        if (!empresaFound) {
          console.log('Empresa Repository: Empresa no encontrada');
          return null;
        }
  
        console.log('Empresa Repository: Empresa encontrada');
        return empresaFound;
      } catch (error) {
        console.error(
          `Empresa Repository: Error al buscar una empresa: ${error.message}`
        );
        throw new Error(`Error al buscar una empresa: ${error.message}`);
      }
    }
    async createEmpresa(empresa) {
      try {
        const newEmpresa = new Empresa(empresa);
        const savedEmpresa = await newEmpresa.save();
  
        console.log('Empresa Repository: Empresa creada correctamente');
        return savedEmpresa;
      } catch (error) {
        console.log(`Empresa Repository: Error al crear empresa: ${error.message}`);
        throw new Error(`Error al crear empresa: ${error.message}`);
      }
    }
    async updateEmpresa(empresaId, empresa) {
      try {
        const updatedEmpresa = await Empresa.findOneAndUpdate(
          { _id: new mongoose.Types.ObjectId(empresaId) },
          empresa,
          {
            new: true,
          }
        );
  
        if (!updatedEmpresa) {
          console.log(
            'Empresa Repository: Empresa no encontrada para ser actualizado'
          );
          return null;
        }
  
        console.log('Empresa Repository: Empresa actualizada correctamente');
        return updatedEmpresa;
      } catch (error) {
        console.error(
          `Empresa Repository: Error al actualizar empresa: ${error.message}`
        );
        throw new Error(`Error al actualizar empresa: ${error.message}`);
      }
    }
    async deleteEmpresa(empresaId) {
      try {
        const deletedEmpresa = await Empresa.findOneAndDelete({
          _id: new mongoose.Types.ObjectId(empresaId),
        });
  
        if (!deletedEmpresa) {
          console.log(
            'Empresa Repository: Empresa no encontrada para ser eliminada'
          );
          return null;
        }
  
        console.log('Empresa Repository: Empresa encontrada y eliminada');
        return deletedEmpresa;
      } catch (error) {
        console.error(
          `Empresa Repository: Error al eliminar empresa: ${error.message}`
        );
        throw new Error(`Error al eliminar empresa: ${error.message}`);
      }
    }
}