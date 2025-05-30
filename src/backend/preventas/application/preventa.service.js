import { PreventaRepository } from "@/backend/preventas/domain/repositories/preventaRepository";
import { createPreventaSchema } from "@/backend/preventas/application/validations/createPreventaSchema";
import { generarNumeroAleatorio } from "@/lib/utils";
import { ProductRepository } from "@/backend/products/domain/repositories/productRepository";
import { MotoRepository } from "@/backend/motos/domain/repositories/motoRepository";
import { ClienteRepository } from "@/backend/clientes/domain/repositories/clienteRepository";

export class PreventaService {
  constructor() {
    this.preventaRepository = new PreventaRepository();
    this.productRepository = new ProductRepository();
    this.motoRepository = new MotoRepository();
    this.clienteRepository = new ClienteRepository();
  }

  async getAllPreventas() {
    try {
      const preventas = await this.preventaRepository.getAllPreventas();

      if (preventas?.length === 0) {
        console.log("Preventa Service: No se encontraron preventas");
        return {
          status: 200,
          payload: [],
        };
      }

      console.log("Preventa Service: Preventas encontradas");
      return {
        status: 200,
        payload: preventas,
      };
    } catch (error) {
      console.error(
        `Preventa Service: Error interno al buscar todas las preventas: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  
  async getPreventaByData(preventaData) {
    try {
      const preventaFound = await this.preventaRepository.getPreventaByData(
        preventaData
      );

      if (!preventaFound) {
        console.log("Preventa Service: La preventa no existe");
        return {
          status: 200,
          payload: null,
        };
      }

      console.log("Preventa Service: La preventa existe");
      return {
        status: 200,
        payload: preventaFound,
      };
    } catch (error) {
      console.error(
        `Preventa Service: Error interno al buscar la preventa: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async createPreventa(preventaData) {
    try {

      // Lógica para buscar o crear cliente

      const clienteTipo = preventaData?.cliente?.tipo;
      const clienteDatos = preventaData?.cliente?.datos;

      const clienteExistente = await this.clienteRepository.getClienteByData(
        clienteDatos
      );

      let clienteFinal = clienteExistente;

      if (!clienteExistente) {
        // Crear el cliente si no existe
        clienteFinal = await this.clienteRepository.createCliente({
          tipo: clienteTipo,
          datos: clienteDatos,
        });

        if (!clienteFinal?._id) {
          return {
            status: 400,
            payload: "No se pudo crear el cliente.",
          };
        }
      }

      console.log("Esto es el preventa data", preventaData);

      // Reemplazar cliente en preventaData por clienteId
      preventaData.clienteId = clienteFinal._id.toString();
      delete preventaData.cliente;

      console.log("Esto es el preventa data despues", preventaData);

      // Validar los datos del producto enviado con el schema
      const preventaValidated = createPreventaSchema.safeParse(preventaData);

      if (!preventaValidated.success) {
        console.log(
          `Preventa Service: Error de validación de schema de preventa al crear`,
          preventaValidated.error.format?.() || preventaValidated.error
        );
        return {
          status: 400,
          payload: preventaValidated.error.issues,
        };
      }

      // Cambiar el estado de los productos y motos a prevendidos
      // eslint-disable-next-line no-undef
      await Promise.all(
        preventaData?.productos?.map(async (producto) => {
          if (producto.modeloId && preventaData?.cotizacion !== "si") {
            await this.motoRepository.updateMoto(producto._id, {
              estado: {
                titulo: "prevendido",
                observaciones: producto?.estado?.observaciones,
              },
            });
          } else {
            if (preventaData?.cotizacion !== "si") {
              await this.productRepository.updateUnitProduct(producto.unitId, {
                estado: "prevendido",
              });
            }
          }
        })
      );

      // Cambiar el estado de los obsequios incluidos en la preventa
      // eslint-disable-next-line no-undef
      await Promise.all(
        preventaData?.obsequios?.map(async (obsequio) => {
          // En caso de ser SOAT, salta a la siguiente iteración
          if (obsequio.nombre === "SOAT") return;

          await this.productRepository.updateUnitProduct(obsequio.unitId, {
            estado: "prevendido",
          });
        })
      );

      const preventaObject = {
        ...preventaData,
        code: generarNumeroAleatorio(13),
      };
      const newPreventa = await this.preventaRepository.createPreventa(
        preventaObject
      );
      console.log("Preventa Service: Preventa creada correctamente");
      return {
        status: 201,
        payload: newPreventa,
      };
    } catch (error) {
      console.log(
        `Preventa Service: Error interno al crear una preventa ${error}`
      );
      return {
        status: 400,
        payload: error,
      };
    }
  }

  async updatePreventa(preventaId, preventaData) {
    try {
      if (!preventaId) {
        console.log("Preventa Service: PreventaId no enviado");
        return {
          status: 400,
          payload: "PreventaId no enviado",
        };
      }

      // Lógica para buscar o crear cliente

      const clienteTipo = preventaData?.cliente?.tipo;
      const clienteDatos = preventaData?.cliente?.datos;

      const clienteExistente = await this.clienteRepository.getClienteByData(
        clienteDatos
      );

      let clienteFinal = clienteExistente;

      if (!clienteExistente) {
        // Crear el cliente si no existe
        clienteFinal = await this.clienteRepository.createCliente({
          tipo: clienteTipo,
          datos: clienteDatos,
        });

        if (!clienteFinal?._id) {
          return {
            status: 400,
            payload: "No se pudo crear el cliente.",
          };
        }
      }

      // Reemplazar cliente en preventaData por clienteId
      preventaData.clienteId = clienteFinal._id.toString();
      delete preventaData.cliente;

      const preventaUpdated = await this.preventaRepository.updatePreventa(
        preventaId,
        preventaData
      );

      if (!preventaUpdated) {
        console.log("Preventa Service: La preventa no existe");
        return {
          status: 404,
          payload: "La preventa no existe",
        };
      }

      console.log("Preventa Service: Preventa actualizada correctamente");
      return {
        status: 200,
        payload: preventaUpdated,
      };
    } catch (error) {
      console.error(
        `Preventa Service: Error interno al actualizar la preventa: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }

  async cancelarPreventa(preventaId) {
    try {
      const preventaFound = await this.preventaRepository.getPreventaByData({
        _id: preventaId,
      });

      // Cambiar el estado de los productos y motos a prevendidos
      // eslint-disable-next-line no-undef
      await Promise.all(
        preventaFound?.productos?.map(async (producto) => {
          if (producto.modeloId) {
            await this.motoRepository.updateMoto(producto._id, {
              estado: {
                titulo: "disponible",
                observaciones: producto?.estado?.observaciones,
              },
            });
          } else {
            await this.productRepository.updateUnitProduct(producto.unitId, {
              estado: "disponible",
            });
          }
        })
      );

      // Cambiar el estado de los obsequios incluidos en la preventa
      // eslint-disable-next-line no-undef
      await Promise.all(
        preventaFound?.obsequios?.map(async (obsequio) => {
          // En caso de ser SOAT, salta a la siguiente iteración
          if (obsequio.nombre === "SOAT") return;

          await this.productRepository.updateUnitProduct(obsequio.unitId, {
            estado: "prevendido",
          });
        })
      );

      const deletedPreventa = await this.preventaRepository.deletePreventa(
        preventaId
      );

      if (!deletedPreventa) {
        console.log("Preventa Service: La preventa no existe");
        return {
          status: 200,
          payload: "La preventa no existe",
        };
      }

      console.log("Preventa Service: Preventa eliminada correctamente");
      return {
        status: 204,
        payload: preventaFound,
      };
    } catch (error) {
      console.error(
        `Preventa Service: Error interno al cancelar la preventa: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }

  async deletePreventa(preventaId) {
    try {
      const deletedPreventa = await this.preventaRepository.deletePreventa(
        preventaId
      );

      if (!deletedPreventa) {
        console.log("Preventa Service: La preventa no existe");
        return {
          status: 200,
          payload: "La preventa no existe",
        };
      }

      console.log("Preventa Service: Preventa eliminada correctamente");
      return {
        status: 204,
        payload: deletedPreventa,
      };
    } catch (error) {
      console.error(
        `Preventa Service: Error interno al eliminar la preventa: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
