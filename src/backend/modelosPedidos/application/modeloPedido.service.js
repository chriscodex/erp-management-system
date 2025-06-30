import { ModeloPedidoRepository } from "@/backend/modelosPedidos/domain/repositories/modeloPedidoRepository";
import { SegmentRepository } from "@/backend/segments/domain/repositories/segmentRepository";
import { CategoryRepository } from "@/backend/categorias/domain/repositories/categoryRepository";
import { MarcaRepository } from "@/backend/marcas/domain/repositories/marcaRepository";
import { generarCodigoUnicoDelModeloPedido } from "@/backend/modelosPedidos/application/helpers";
import { createModeloPedidoSchema } from "@/backend/modelosPedidos/application/validations/createModeloPedidoSchema";
import { updateModeloPedidoSchema } from "@/backend/modelosPedidos/application/validations/updateModeloPedidoSchema";

export class ModeloPedidoService {
  constructor() {
    this.modeloPedidoRepository = new ModeloPedidoRepository();
    this.segmentRepository = new SegmentRepository();
    this.categoryRepository = new CategoryRepository();
    this.marcaRepository = new MarcaRepository();
  }
  async getAllModelosPedidos() {
    try {
      const modelosPedidos =
        await this.modeloPedidoRepository.getAllModelosPedidos();

      if (modelosPedidos?.length === 0) {
        console.log("Modelo Pedido Service: No se encontraron modelos");
        return {
          status: 200,
          payload: [],
        };
      }

      console.log("Modelo Pedido Service: Modelos encontrados");
      return {
        status: 200,
        payload: modelosPedidos,
      };
    } catch (error) {
      console.error(
        `Modelo Pedido Service: Error interno al buscar todos los modelos: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getAllModelosPedidosUnpopulated() {
    try {
      const modelosPedidos =
        await this.modeloPedidoRepository.getAllModelosPedidosUnpopulated();

      if (modelosPedidos?.length === 0) {
        console.log("Modelo Pedido Service: No se encontraron modelos");
        return {
          status: 200,
          payload: [],
        };
      }

      console.log("Modelo Pedido Service: Modelos encontrados");
      return {
        status: 200,
        payload: modelosPedidos,
      };
    } catch (error) {
      console.error(
        `Modelo Pedido Service: Error interno al buscar todos los modelos: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getModeloPedidoByData(modeloPedidoData) {
    try {
      const modeloPedidoFound = await this.modeloPedidoRepository.getModeloPedidoByData(
        modeloPedidoData
      );

      if (!modeloPedidoFound) {
        console.log("Modelo Pedido Service: El modelo no existe");
        return {
          status: 200,
          payload: null,
        };
      }

      console.log("Modelo Pedido Service: El modelo existe");
      return {
        status: 200,
        payload: modeloPedidoFound,
      };
    } catch (error) {
      console.error(
        `Modelo Pedido Service: Error interno al buscar el modelo: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async createModeloPedido(modeloPedidoData) {
    try {
      // Validar los datos del modelo enviado con el schema
      const modeloPedidoValidated = createModeloPedidoSchema.safeParse(modeloPedidoData);

      if (!modeloPedidoValidated.success) {
        console.log(
          `Modelo Pedido Service: Error de validación de schema al crear el modelo ${modeloPedidoValidated}`
        );
        return {
          status: 400,
          payload: modeloPedidoValidated.error.issues,
        };
      }

      // Validar si un modelo con ese nombre y en el mismo segmento ya existe
      const modeloPedidoFound = await this.modeloPedidoRepository.getModeloPedidoByData(
        modeloPedidoData
      );
      if (modeloPedidoFound) {
        console.log(
          "Modelo Pedido Service: Un modelo con el mismo nombre ya existe"
        );
        return {
          status: 409,
          payload: "Un modelo con el mismo nombre ya existe",
        };
      }
      console.log("Modelo Pedido Service: No hay duplicados");

      // Generar el codigo unico
      const modeloPedidoCode = await generarCodigoUnicoDelModeloPedido(
        this.modeloPedidoRepository
      );

      const modeloPedidoObject = {
        ...modeloPedidoData,
        code: modeloPedidoCode,
        estado: "activo",
      };
      // Crear el modelo
      const modeloPedidoCreated = await this.modeloPedidoRepository.createModeloPedido(
        modeloPedidoObject
      );
      console.log("Modelo Pedido Service: Modelo creado correctamente");
      return {
        status: 201,
        payload: modeloPedidoCreated,
      };
    } catch (error) {
      console.error(
        `Modelo Pedido Service: Error interno al crear un modelo: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async updateModeloPedido(modeloId, modeloPedidoData) {
    try {
      const modeloPedidoValidated = updateModeloPedidoSchema.safeParse(modeloPedidoData);

      if (!modeloPedidoValidated.success) {
        console.log(
          "Modelo Pedido Service: Error de validación de schema de modelo al actualizar"
        );
        return {
          status: 400,
          payload: modeloPedidoValidated.error.issues,
        };
      }

      // Validar si un modelo con ese nombre ya existe
      if (modeloPedidoData.nombre) {
        const modeloPedidoFound = await this.modeloPedidoRepository.getModeloPedidoByData(
          modeloPedidoData
        );
        if (modeloPedidoFound && modeloPedidoFound?._id !== modeloId) {
          console.log(
            "Modelo Pedido Service: Un modelo con el mismo nombre ya existe"
          );
          return {
            status: 409,
            payload: "Un modelo con el mismo nombre ya existe",
          };
        }
      }

      const modeloPedidoUpdated = await this.modeloPedidoRepository.updateModeloPedido(
        modeloId,
        modeloPedidoData
      );

      if (!modeloPedidoUpdated) {
        console.log("Modelo Pedido Service: El modelo no existe");
        return {
          status: 404,
          payload: "El modelo no existe",
        };
      }

      console.log("Modelo Pedido Service: Modelo actualizado correctamente");
      return {
        status: 200,
        payload: modeloPedidoUpdated,
      };
    } catch (error) {
      console.error(
        `Modelo Pedido Service: Error interno al actualizar un modelo: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deleteModeloPedido(id) {
    try {
      const modeloPedidoDeleted = await this.modeloPedidoRepository.deleteModeloPedido(id);

      if (!modeloPedidoDeleted) {
        console.log(
          "Modelo Pedido Service: Modelo no encontrado para ser eliminado"
        );
        return {
          status: 404,
          payload: "El modelo no existe",
        };
      }

      console.log("Modelo Pedido Service: Modelo eliminado correctamente");
      return {
        status: 204,
        payload: modeloPedidoDeleted,
      };
    } catch (error) {
      console.error(
        `Modelo Pedido Service: Error interno al eliminar un modelo: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
