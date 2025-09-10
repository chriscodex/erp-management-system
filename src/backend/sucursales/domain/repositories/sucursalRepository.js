import mongoose from 'mongoose';
import { Sucursal } from '@/backend/sucursales/domain/models/sucursal';

export class SucursalRepository {
  constructor() {
    this.sucursalModel = Sucursal;
  }

  async getAllSucursales() {
    try {
      const sucursales = await Sucursal.find();

      if (sucursales?.length === 0) {
        console.log('Sucursal Repository: No se encontraron sucursales');
        return [];
      }

      console.log('Sucursal Repository: Sucursales encontradas');
      return sucursales;
    } catch (error) {
      console.error(
        `Sucursal Repository: Error al buscar todas las sucursales: ${error.message}`,
      );
      throw new Error(`Error al buscar todas las sucursales: ${error.message}`);
    }
  }
  async getSucursalByData(sucursalData) {
    try {
      if (!sucursalData) {
        console.log('Sucursal Repository: Sucursal no proporcionada');
        return null;
      }

      const filter = {};

      if (sucursalData.id) {
        filter._id = new mongoose.Types.ObjectId(sucursalData.id);
      }

      if (sucursalData.nombre) {
        filter.nombre = sucursalData.nombre;
      }

      const empresaFound = await Sucursal.findOne(filter);

      if (!empresaFound) {
        console.log('Sucursal Repository: Sucursal no encontrada');
        return null;
      }

      console.log('Sucursal Repository: Sucursal encontrada');
      return empresaFound;
    } catch (error) {
      console.error(
        `Sucursal Repository: Error al buscar una empresa: ${error.message}`,
      );
      throw new Error(`Error al buscar una empresa: ${error.message}`);
    }
  }
  async getFirstSucursal() {
    try {
      const empresaFound = await Sucursal.findOne().sort({ createdAt: 1 });

      if (!empresaFound) {
        console.log('Sucursal Repository: Sucursal no encontrada');
        return null;
      }

      console.log('Sucursal Repository: Sucursal encontrada');
      return empresaFound;
    } catch (error) {
      console.error(
        `Sucursal Repository: Error al buscar una empresa: ${error.message}`,
      );
      throw new Error(`Error al buscar una empresa: ${error.message}`);
    }
  }
  async createSucursal(empresa) {
    try {
      const newSucursal = new Sucursal(empresa);
      const savedSucursal = await newSucursal.save();

      console.log('Sucursal Repository: Sucursal creada correctamente');
      return savedSucursal;
    } catch (error) {
      console.log(
        `Sucursal Repository: Error al crear empresa: ${error.message}`,
      );
      throw new Error(`Error al crear empresa: ${error.message}`);
    }
  }
  async updateSucursal(empresaId, empresa) {
    try {
      const updatedSucursal = await Sucursal.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(empresaId) },
        empresa,
        {
          new: true,
        },
      );

      if (!updatedSucursal) {
        console.log(
          'Sucursal Repository: Sucursal no encontrada para ser actualizado',
        );
        return null;
      }

      console.log('Sucursal Repository: Sucursal actualizada correctamente');
      return updatedSucursal;
    } catch (error) {
      console.error(
        `Sucursal Repository: Error al actualizar empresa: ${error.message}`,
      );
      throw new Error(`Error al actualizar empresa: ${error.message}`);
    }
  }
  async deleteSucursal(empresaId) {
    try {
      const deletedSucursal = await Sucursal.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(empresaId),
      });

      if (!deletedSucursal) {
        console.log(
          'Sucursal Repository: Sucursal no encontrada para ser eliminada',
        );
        return null;
      }

      console.log('Sucursal Repository: Sucursal encontrada y eliminada');
      return deletedSucursal;
    } catch (error) {
      console.error(
        `Sucursal Repository: Error al eliminar empresa: ${error.message}`,
      );
      throw new Error(`Error al eliminar empresa: ${error.message}`);
    }
  }
}
