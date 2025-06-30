import { OrdenServicioRepository } from "@/backend/ordenesServicio/domain/repositories/ordenServicioRepository";
import { createOrdenServicioSchema } from "@/backend/ordenesServicio/application/validations/createOrdenServicioSchema";
import { generarNumeroAleatorio } from "@/lib/utils";
import { ProductRepository } from "@/backend/products/domain/repositories/productRepository";
import { ClienteRepository } from "@/backend/clientes/domain/repositories/clienteRepository";
import { UserRepository } from "@/backend/users/domain/repositories/userRepository";
import { OrdenServicioHistoricaRepository } from "@/backend/ordenesServicio/domain/repositories/ordenServicioHistoricaRepository";
import { updateOrdenServicioSchema } from "@/backend/ordenesServicio/application/validations/updateOrdenServicioSchema";

export class OrdenServicioService {
  constructor() {
    this.ordenServicioRepository = new OrdenServicioRepository();
    this.ordenServicioHistoricaRepository = new OrdenServicioHistoricaRepository();
    this.clienteRepository = new ClienteRepository();
    this.productRepository = new ProductRepository();
    this.userRepository = new UserRepository();
  }

  async getAllOrdenesDeServicio() {
    try {
      const ordenesDeServicio = await this.ordenServicioRepository.getAllOrdenesDeServicio();

      if (ordenesDeServicio?.length === 0) {
        console.log("Orden De Servicio Service: No se encontraron ordenes de servicio");
        return {
          status: 200,
          payload: [],
        };
      }
      console.log("Orden De Servicio Service: Orden de servicio encontradas");
      return {
        status: 200,
        payload: ordenesDeServicio,
      };
    } catch (error) {
      console.error(
        `Orden De Servicio Service: Error interno al buscar todas las ordenes de servicio: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }

  async getOrdenDeServicioByData(ordenDeServicioData) {
    try {
      const ordenDeServicioFound = await this.ordenServicioRepository.getOrdenDeServicioByData(
        ordenDeServicioData
      );

      if (!ordenDeServicioFound) {
        console.log("Orden De Servicio Service: La orden de servicio no existe");
        return {
          status: 200,
          payload: null,
        };
      }

      console.log("Orden De Servicio Service: La orden de servicio existe");
      return {
        status: 200,
        payload: ordenDeServicioFound,
      };
    } catch (error) {
      console.error(
        `Orden De Servicio Service: Error interno al buscar la orden de servicio: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }

  async createOrdenDeServicio(ordenDeServicioData) {
    try {
      // Lógica para buscar o crear cliente

      const clienteTipo = ordenDeServicioData?.cliente?.tipo;
      const clienteDatos = ordenDeServicioData?.cliente?.datos;

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

      // Reemplazar cliente en ordenDeServicioData por clienteId
      ordenDeServicioData.cliente.clienteId = clienteFinal._id.toString();
      // delete ordenDeServicioData.cliente;

      const ordenDeServicioObject = {
        ...ordenDeServicioData,
        code: generarNumeroAleatorio(13),
        comprobante: 'No impreso',
        estadoSunat: 'Por enviar',
      };

      // Validar los datos de la orden de servicio
      const ordenServicioValidated = createOrdenServicioSchema.safeParse(ordenDeServicioObject);

      if (!ordenServicioValidated.success) {
        // console.log(
        //   `Orden De Servicio Service: Error de validación de schema de orden de servicio al crear ${ordenServicioValidated}`
        // )
        console.log(
          "Orden De Servicio Service: Error de validación de schema de orden de servicio al crear",
          ordenServicioValidated.error.format?.() || ordenServicioValidated.error
        );
        ;
        return {
          status: 400,
          payload: ordenServicioValidated.error.issues,
        };
      }
      const newOrdenDeServicio = await this.ordenServicioRepository.createOrdenDeServicio(
        ordenDeServicioObject
      );
      console.log("Orden De Servicio Service: Orden de servicio creada correctamente");
      return {
        status: 201,
        payload: newOrdenDeServicio,
      };
    } catch (error) {
      console.log(
        `Orden De Servicio Service: Error interno al crear una orden de servicio ${error}`
      );
      return {
        status: 400,
        payload: error,
      };
    }
  }

  async updateOrdenDeServicio(ordenDeServicioId, ordenDeServicioData) {
    try {

      if (!ordenDeServicioId) {
        console.log("Orden De Servicio Service: OrdenDeServicioId no enviado");
        return {
          status: 400,
          payload: "OrdenDeServicioId no enviado",
        };
      }

      //Obtener la orden de servicio antes de editar

      const ordenDeServicioBefore = await this.ordenServicioRepository.getOrdenDeServicioByData({
        id: ordenDeServicioId,
      });

      if (!ordenDeServicioBefore) {
        return { status: 404, payload: "La orden de servicio no existe" };
      }

      const { cliente, isDelete, ...cleanedOrdenDeServicioData } = ordenDeServicioData;

      if (cliente) {
        // Lógica para buscar o crear cliente

        const clienteTipo = ordenDeServicioData?.cliente?.tipo;
        const clienteDatos = ordenDeServicioData?.cliente?.datos;

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

        ordenDeServicioData.cliente.clienteId = clienteFinal._id.toString();
      }

      if (isDelete) {
        console.log("Procesando una eliminación de producto");

        // Actualiza directamente sin procesar la lógica de productos
        const ordenDeServicioUpdated = await this.ordenServicioRepository.updateOrdenDeServicio(
          ordenDeServicioId,
          cleanedOrdenDeServicioData
        );

        if (!ordenDeServicioUpdated) {
          console.log("Orden De Servicio Service: La orden de servicio no existe");
          return {
            status: 404,
            payload: "La orden de servicio no existe",
          };
        }

        console.log("Orden De Servicio Service: Orden actualizada como eliminación");
        return {
          status: 200,
          payload: ordenDeServicioUpdated,
        };

      }

      const paraImprimir = ordenDeServicioData?.counter !== undefined;

      if (!paraImprimir) {
        //Cambiar el estado de los productos y motos a taller

        //Identificar productos
        const antiguosProductos = ordenDeServicioBefore?.productos || [];
        const nuevosProductos = ordenDeServicioData?.productos || [];

        const idsAntiguos = antiguosProductos.map(product => product.unitId);
        const idsNuevos = nuevosProductos.map(product => product.unitId);

        // Productos quitados
        const productosQuitados = antiguosProductos.filter(product => {
          const id = product.unitId;
          return !idsNuevos.includes(id);
        });

        // Productos agregados
        const productosAgregados = nuevosProductos.filter(product => {
          const id = product.unitId;
          return !idsAntiguos.includes(id);
        });

        // Cambiar estado a "disponible" de productos quitados

        // eslint-disable-next-line no-undef
        await Promise.all(productosQuitados.map(async product => {
          await this.productRepository.updateUnitProduct(product.unitId, { estado: "disponible" });
        }));

        // Cambiar estado a "taller" de productos agregados
        // eslint-disable-next-line no-undef
        await Promise.all(productosAgregados.map(async product => {
          await this.productRepository.updateUnitProduct(product.unitId, { estado: "taller" });
        }));

        // Validar los datos de la orden de servicio
        const ordenServicioValidated = updateOrdenServicioSchema.safeParse(ordenDeServicioData);

        if (!ordenServicioValidated.success) {
          console.log(
            "Orden De Servicio Service: Error de validación de schema de orden de servicio al actualizar",
            ordenServicioValidated.error.format?.() || ordenServicioValidated.error
          );
          return {
            status: 400,
            payload: ordenServicioValidated.error.issues,
          };
        }
      }

      const ordenDeServicioUpdated = await this.ordenServicioRepository.updateOrdenDeServicio(
        ordenDeServicioId,
        ordenDeServicioData
      );

      if (!ordenDeServicioUpdated) {
        console.log("Orden De Servicio Service: La orden de servicio no existe");
        return {
          status: 404,
          payload: "La orden de servicio no existe",
        };
      }

      console.log("Orden De Servicio Service: Orden de servicio actualizada correctamente");
      return {
        status: 200,
        payload: ordenDeServicioUpdated,
      };
    } catch (error) {
      console.error(
        `Orden De Servicio Service: Error interno al actualizar la orden de servicio: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }

  async deleteOrdenDeServicio(ordenDeServicioId) {
    try {

      //Obtener la orden de servicio antes de eliminar

      const ordenDeServicio = await this.ordenServicioRepository.getOrdenDeServicioByData({
        id: ordenDeServicioId,
      });

      if (!ordenDeServicio) {
        return { status: 404, payload: "La orden de servicio no existe" };
      }

      // Cambiar el estado de los productos a disponible

      // eslint-disable-next-line no-undef
      await Promise.all(
        ordenDeServicio?.productos?.map(async (producto) => {
          await this.productRepository.updateUnitProduct(producto.unitId, {
            estado: "disponible",
          });
        })
      );

      const deletedOrdenDeServicio = await this.ordenServicioRepository.deleteOrdenDeServicio(
        ordenDeServicioId
      );

      if (!deletedOrdenDeServicio) {
        console.log("Orden De Servicio Service: La orden de servicio no existe");
        return {
          status: 200,
          payload: "La orden de servicio no existe",
        };
      }

      console.log("Orden De Servicio Service: Orden de servicio eliminada correctamente");
      return {
        status: 204,
        payload: deletedOrdenDeServicio,
      };
    } catch (error) {
      console.error(
        `Orden De Servicio Service: Error interno al eliminar la orden de servicio: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async finalizarOrdenDeServicio(ordenDeServicioId) {
    try {

      const ordenDeServicio = await this.ordenServicioRepository.getOrdenDeServicioByData({
        id: ordenDeServicioId,
      });

      if (!ordenDeServicio) {
        console.log('Orden De Servicio Service: La orden de servicio no existe');
        return {
          status: 200,
          payload: 'La orden de servicio no existe',
        };
      }

      const ordenDeServicioHistorica = {
        code: ordenDeServicio.code,
        cliente: ordenDeServicio.cliente,
        moto: ordenDeServicio.moto,
        mecanicos: ordenDeServicio.mecanicos,
        pago: ordenDeServicio.pago,
        productos: ordenDeServicio.productos,
        servicios: ordenDeServicio.servicios,
        productosExternos: ordenDeServicio.productosExternos,

        fechaIngreso: ordenDeServicio.fechaIngreso,
        origenServicio: ordenDeServicio.origenServicio,
        tipoServicio: ordenDeServicio.tipoServicio,
        comentarios: ordenDeServicio.comentarios,

        estadoSunat: ordenDeServicio.estadoSunat,
        counter: ordenDeServicio.counter,
        comprobante: ordenDeServicio.comprobante,
        empresa: ordenDeServicio.empresa,

        estado: ordenDeServicio.estado,
        fechaEntregaEstimada: ordenDeServicio.fechaEntregaEstimada,
      };

      const ordenDeServicioHistoricaCreated = await this.ordenServicioHistoricaRepository.createOrdenDeServicioHistorica(
        ordenDeServicioHistorica
      );

      console.log('Orden De Servicio Service: Orden de servicio finalizada correctamente');

      await this.ordenServicioRepository.deleteOrdenDeServicio(ordenDeServicioId);

      console.log('Orden De Servicio Service: Orden de servicio eliminada correctamente');

      // Eliminar los productos del inventario
      // eslint-disable-next-line no-undef
      // await Promise.all(
      //   ordenDeServicio?.productos?.map(async (producto) => {
      //       await this.productRepository.deleteSingleUnitFromProduct(
      //         producto.productId,
      //         producto.unitId
      //       );
      //   })
      // );

      return {
        status: 201,
        payload: {
          message: 'Orden de servicio finalizada correctamente',
          _id: ordenDeServicioHistoricaCreated._id,
        },
      };
    } catch (error) {
      console.error(
        `Orden De Servicio Service: Error interno al finalizar la orden de servicio: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}

