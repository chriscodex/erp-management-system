import { createMotoSchema } from '@/backend/motos/application/validations/createMotoSchema';
import { MotoRepository } from '@/backend/motos/domain/repositories/motoRepository';
import { ModeloRepository } from '@/backend/modelos/domain/repositories/modeloRepository';
import { AlmacenRepository } from '@/backend/almacenes/domain/repositories/almacenRepository';
import { ProveedorRepository } from '@/backend/proveedores/domain/repositories/proveedorRepository';
import { generarCodigoUnicoDeMoto } from '@/backend/motos/application/helpers';

export class MotoService {
  constructor() {
    this.motoRepository = new MotoRepository();
    this.modeloRepository = new ModeloRepository();
    this.almacenRepository = new AlmacenRepository();
    this.proveedorRepository = new ProveedorRepository();
  }
  async getAllMotosByModeloId(modeloId) {
    try {
      const motosFiltered = await this.motoRepository.getAllMotosByModeloId(
        modeloId
      );

      if (!motosFiltered) {
        console.log(
          'Moto Service: No se encontraron motos filtradas por modeloId'
        );
        return {
          status: 404,
          payload: 'No se encontraron motos filtradas por modeloId',
        };
      }

      console.log('Moto Service: Motos filtradas por modeloId encontradas');
      return {
        status: 200,
        payload: motosFiltered,
      };
    } catch (error) {
      console.error(
        `Moto Service: Error interno al obtener las motos filtradas por modeloId: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async createMoto(motoData) {
    try {
      const motoValidated = createMotoSchema.safeParse(motoData);

      if (!motoValidated.success) {
        console.log(
          `Moto Service: Error de validación de schema de moto al crear ${motoValidated}`
        );
        return {
          status: 400,
          payload: motoValidated.error.issues,
        };
      }

      // Validar si una moto con ese nombre y en el mismo modelo ya existe
      const motoFound = await this.motoRepository.getMotoByData(motoData);
      if (motoFound) {
        console.log('Moto Service: Una moto con el mismo nombre ya existe');
        return {
          status: 409,
          payload: 'Una Moto con el mismo nombre ya existe',
        };
      }
      console.log('Moto Service: No hay duplicados');

      // Validar si el modelo existe
      const modeloFound = await this.modeloRepository.getModeloByData({
        id: motoData.modeloId,
      });
      const { code: modeloCode } = modeloFound;
      if (!modeloFound) {
        console.log('Moto Service: El modelo no existe');
        return {
          status: 404,
          payload: 'El modelo no existe',
        };
      }
      console.log('Moto Service: La moto existe');

      // Validar si el almacen existe
      const almacenFound = await this.almacenRepository.getAlmacenByData({
        id: motoData.almacenId,
      });
      if (!almacenFound) {
        console.log('Moto Service: El almacen no existe');
        return {
          status: 404,
          payload: 'El almacen no existe',
        };
      }
      console.log('Moto Service: El almacen existe');

      // Validar si el proveedor existe
      const proveedorFound = await this.proveedorRepository.getProveedorByData({
        id: motoData.proveedorId,
      });
      if (!proveedorFound) {
        console.log('Moto Service: El proveedor no existe');
        return {
          status: 404,
          payload: 'El proveedor no existe',
        };
      }
      console.log('Moto Service: El proveedor existe');

      const motoCode = await generarCodigoUnicoDeMoto(
        modeloCode,
        this.motoRepository
      );

      const motoObject = {
        ...motoData,
        code: motoCode,
        estado: 'disponible',
      };

      const motoCreated = await this.motoRepository.createMoto(motoObject);
      console.log('Moto Service: Moto creada correctamente');
      return {
        status: 201,
        payload: motoCreated,
      };
    } catch (error) {
      console.error(
        `Moto Service: Error interno al crear la moto: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
