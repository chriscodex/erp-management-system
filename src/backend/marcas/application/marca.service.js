import { MarcaRepository } from '@/backend/marcas/domain/repositories/marcaRepository';
import { SegmentRepository } from '@/backend/segments/domain/repositories/segmentRepository';
import { createMarcaSchema } from '@/backend/marcas/application/validations/createMarcaSchema';
import { updateMarcaSchema } from '@/backend/marcas/application/validations/updateMarcaSchema';

export class MarcaService {
  constructor() {
    this.marcaRepository = new MarcaRepository();
    this.segmentRepository = new SegmentRepository();
  }
  async getAllMarcas() {
    try {
      const marcas = await this.marcaRepository.getAllMarcas();

      if (marcas.length === 0) {
        console.log('Marca Service: No se encontraron marcas');
        return {
          status: 200,
          payload: [],
        };
      }

      console.log('Marca Service: Marcas encontradas');
      return {
        status: 200,
        payload: marcas,
      };
    } catch (error) {
      console.error(
        `Marca Service: Error interno al buscar todas las marcas: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getMarcasBySegmentData(segmentData) {
    try {
      const marcasFiltered = await this.marcaRepository.getMarcasBySegmentData(
        segmentData
      );

      if (marcasFiltered.length === 0) {
        console.log(
          'Marca Service: No se encontraron marcas filtradas por segmento'
        );
        return {
          status: 200,
          payload: [],
        };
      }

      console.log('Marca Service: Marcas filtradas por segmento encontradas');
      return {
        status: 200,
        payload: marcasFiltered,
      };
    } catch (error) {
      console.error(
        `Marca Service: Error interno al obtener marcas filtradas por segmento: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getMarcaByData(marcaData) {
    try {
      const marcaFound = await this.marcaRepository.getMarcaByData(marcaData);

      if (!marcaFound) {
        console.log('Marca Service: La marca no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Marca Service: La marca existe');
      return {
        status: 200,
        payload: marcaFound,
      };
    } catch (error) {
      console.error(
        `Marca Service: Error interno al buscar la marca: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async createMarca(marca) {
    try {
      // Validar los datos de la marca enviada con el schema
      const marcaValidated = createMarcaSchema.safeParse(marca);

      if (!marcaValidated.success) {
        console.log(
          `Marca Service: Error de validación de schema de marca al crear ${marcaValidated}`
        );
        return {
          status: 400,
          payload: marcaValidated.error.issues,
        };
      }

      // Validar si el segmento existe
      const segmentFound = await this.segmentRepository.getSegmentByData({
        id: marca.segmentId,
      });
      if (!segmentFound) {
        console.log('Marca Service: El segmento no existe');
        return {
          status: 404,
          payload: 'El segmento no existe',
        };
      }

      // Validar si una marca con ese nombre y en el mismo segmento ya existe
      const marcaFound = await this.marcaRepository.getMarcaByData(marca);
      if (marcaFound) {
        console.log('Marca Service: La marca ya existe en este segmento');
        return {
          status: 409,
          payload: 'La marca ya existe en este segmento',
        };
      }

      // Crear el objeto de marca que será guardado en la base de datos
      const marcaObject = {
        ...marca,
        estado: 'activo',
      };

      // Crear la marca
      const marcaCreated = await this.marcaRepository.createMarca(marcaObject);

      console.log('Marca Service: Marca creada correctamente');
      return {
        status: 201,
        payload: marcaCreated,
      };
    } catch (error) {
      console.error(
        `Marca Service: Error interno al crear una marca: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async updateMarca(id, marca) {
    try {
      // Validar los datos del usuario enviado con el schema
      const marcaValidated = updateMarcaSchema.safeParse(marca);

      if (!marcaValidated.success) {
        console.log(
          'Marca Service: Error de validación de schema de marca al actualizar'
        );
        return {
          status: 400,
          payload: marcaValidated.error.issues,
        };
      }

      // Validar si el segmento enviado existe
      if (marca.segmentId) {
        const segmentFound = await this.segmentRepository.getSegmentByData({
          id: marca.segmentId,
        });
        if (!segmentFound) {
          console.log('Marca Service: El segmento no existe');
          return {
            status: 404,
            payload: 'El segmento no existe',
          };
        }
      }

      // Validar si una marca con ese nombre y en el mismo segmento ya existe
      if (marca.nombre) {
        const marcaFound = await this.marcaRepository.getMarcaByData(marca);
        if (marcaFound && marcaFound?._id !== id) {
          console.log(
            'Marca Service: Una marca con el mismo nombre ya existe en el segmento seleccionado'
          );
          return {
            status: 409,
            payload:
              'Una marca con el mismo nombre ya existe en el segmento seleccionado',
          };
        }
      }

      const marcaUpdated = await this.marcaRepository.updateMarca(id, marca);

      if (!marcaUpdated) {
        console.log('Marca Service: La marca no existe');
        return {
          status: 404,
          payload: 'La marca no existe',
        };
      }

      console.log('Marca Service: Marca actualizada correctamente');
      return {
        status: 200,
        payload: marcaUpdated,
      };
    } catch (error) {
      console.error(
        `Marca Service: Error interno al actualizar la marca: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deleteMarca(id) {
    try {
      const marcaDeleted = await this.marcaRepository.deleteMarca(id);

      if (!marcaDeleted) {
        console.log('Marca Service: Marca no encontrada para ser eliminada');
        return {
          status: 200,
          payload: 'La marca no existe',
        };
      }

      console.log('Marca Service: Marca eliminada correctamente');
      return {
        status: 204,
        payload: marcaDeleted,
      };
    } catch (error) {
      console.error(
        `Marca Service: Error interno al eliminar la marca: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
