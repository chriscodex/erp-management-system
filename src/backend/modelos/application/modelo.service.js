import { ModeloRepository } from '@/backend/modelos/domain/repositories/modeloRepository';
import { SegmentRepository } from '@/backend/segments/domain/repositories/segmentRepository';
import { CategoryRepository } from '@/backend/categorias/domain/repositories/categoryRepository';
import { MarcaRepository } from '@/backend/marcas/domain/repositories/marcaRepository';
import { AlmacenRepository } from '@/backend/almacenes/domain/repositories/almacenRepository';
import { ProveedorRepository } from '@/backend/proveedores/domain/repositories/proveedorRepository';
import { generarCodigoUnicoDelModelo } from '@/backend/modelos/application/helpers';
import { createModeloSchema } from '@/backend/modelos/application/validations/createModeloSchema';

export class ModeloService {
  constructor() {
    this.modeloRepository = new ModeloRepository();
    this.segmentRepository = new SegmentRepository();
    this.categoryRepository = new CategoryRepository();
    this.marcaRepository = new MarcaRepository();
    this.almacenRepository = new AlmacenRepository();
    this.proveedorRepository = new ProveedorRepository();
  }
  async createModelo(modeloData) {
    try {
      // Validar los datos del modelo enviado con el schema
      const modeloValidated = createModeloSchema.safeParse(modeloData);

      if (!modeloValidated.success) {
        console.log(
          `Modelo Service: Error de validación de schema al crear el modelo ${modeloValidated}`
        );
        return {
          status: 400,
          payload: modeloValidated.error.issues,
        };
      }

      // Validar si el segmento existe
      const segmentFound = await this.segmentRepository.getSegmentByData({
        id: modeloData.segmentId,
      });
      if (!segmentFound) {
        console.log('Modelo Service: El segmento no existe');
        return {
          status: 404,
          payload: 'El segmento no existe',
        };
      }
      console.log('Modelo Service: El segmento existe');

      // Validar si un modelo con ese nombre y en el mismo segmento ya existe
      const modeloFound = await this.modeloRepository.getModeloByData(
        modeloData
      );
      if (modeloFound) {
        console.log('Modelo Service: Un modelo con el mismo nombre ya existe');
        return {
          status: 409,
          payload: 'Un modelo con el mismo nombre ya existe',
        };
      }
      console.log('Modelo Service: No hay duplicados');

      // Validar si la categoría existe en el segmento
      const categoryExists = await this.categoryRepository.getCategoryByData({
        segmentId: modeloData.segmentId,
        id: modeloData.categoryId,
      });
      if (!categoryExists) {
        console.log('Modelo Service: La categoría no existe en el segmento');
        return {
          status: 404,
          payload: 'El categoría no existe en el segmento',
        };
      }
      console.log('Modelo Service: La categoría existe en el segmento');

      // Validar si la marca existe en el segmento
      const marcaExists = await this.marcaRepository.getMarcaByData({
        segmentId: modeloData.segmentId,
        id: modeloData.marcaId,
      });
      if (!marcaExists) {
        console.log('Modelo Service: La marca no existe en el segmento');
        return {
          status: 404,
          payload: 'El marca no existe en el segmento',
        };
      }
      console.log('Modelo Service: La marca existe en el segmento');

      // Validar si el almacen existe
      const almacenFound = await this.almacenRepository.getAlmacenByData({
        id: modeloData.almacenId,
      });
      if (!almacenFound) {
        console.log('Modelo Service: El almacen no existe');
        return {
          status: 404,
          payload: 'El almacen no existe',
        };
      }
      console.log('Modelo Service: El almacen existe');

      // Validar si el proveedor existe
      const proveedorFound = await this.proveedorRepository.getProveedorByData({
        id: modeloData.proveedorId,
      });
      if (!proveedorFound) {
        console.log('Modelo Service: El proveedor no existe');
        return {
          status: 404,
          payload: 'El proveedor no existe',
        };
      }
      console.log('Modelo Service: El proveedor existe');

      const modeloCode = await generarCodigoUnicoDelModelo(
        this.modeloRepository
      );

      const modeloObject = {
        ...modeloData,
        code: modeloCode,
      };
      // Crear el modelo
      const modeloCreated = await this.modeloRepository.createModelo(
        modeloObject
      );
      console.log('Modelo Service: Modelo creado correctamente');
      return {
        status: 201,
        payload: modeloCreated,
      };
    } catch (error) {
      console.error(
        `Modelo Service: Error interno al crear un modelo: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
