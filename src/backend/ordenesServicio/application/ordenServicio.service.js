import { OrdenServicioRepository } from '@/backend/ordenesServicio/domain/repositories/ordenServicioRepository';
import { createOrdenServicioSchema } from '@/backend/ordenesServicio/application/validations/createOrdenServicioSchema';
import { generarNumeroAleatorio, obtenerFechaEmisionPeru } from '@/lib/utils';
import { ProductRepository } from '@/backend/products/domain/repositories/productRepository';
import { ClienteRepository } from '@/backend/clientes/domain/repositories/clienteRepository';
import { UserRepository } from '@/backend/users/domain/repositories/userRepository';
import { OrdenServicioHistoricaRepository } from '@/backend/ordenesServicio/domain/repositories/ordenServicioHistoricaRepository';
import { updateOrdenServicioSchema } from '@/backend/ordenesServicio/application/validations/updateOrdenServicioSchema';
import { CounterRepository } from '@/backend/counters/domain/repositories/counterRepository';
import {
  formatNumeroALetras,
  obtenerSerieYCorrelativo,
} from '@/lib/formateador';
import { sendInvoiceToSunat } from '@/backend/shared/apisPeru';

export class OrdenServicioService {
  constructor() {
    this.ordenServicioRepository = new OrdenServicioRepository();
    this.ordenServicioHistoricaRepository =
      new OrdenServicioHistoricaRepository();
    this.clienteRepository = new ClienteRepository();
    this.productRepository = new ProductRepository();
    this.userRepository = new UserRepository();
    this.counterRepository = new CounterRepository();
  }

  async getAllOrdenesDeServicio() {
    try {
      const ordenesDeServicio =
        await this.ordenServicioRepository.getAllOrdenesDeServicio();

      if (ordenesDeServicio?.length === 0) {
        console.log(
          'Orden De Servicio Service: No se encontraron ordenes de servicio'
        );
        return {
          status: 200,
          payload: [],
        };
      }
      console.log('Orden De Servicio Service: Orden de servicio encontradas');
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
      const ordenDeServicioFound =
        await this.ordenServicioRepository.getOrdenDeServicioByData(
          ordenDeServicioData
        );

      if (!ordenDeServicioFound) {
        console.log(
          'Orden De Servicio Service: La orden de servicio no existe'
        );
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Orden De Servicio Service: La orden de servicio existe');
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
            payload: 'No se pudo crear el cliente.',
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
      const ordenServicioValidated = createOrdenServicioSchema.safeParse(
        ordenDeServicioObject
      );

      if (!ordenServicioValidated.success) {
        console.log(
          'Orden De Servicio Service: Error de validación de schema de orden de servicio al crear',
          ordenServicioValidated.error.format?.() ||
            ordenServicioValidated.error
        );
        return {
          status: 400,
          payload: ordenServicioValidated.error.issues,
        };
      }
      const newOrdenDeServicio =
        await this.ordenServicioRepository.createOrdenDeServicio(
          ordenDeServicioObject
        );
      console.log(
        'Orden De Servicio Service: Orden de servicio creada correctamente'
      );
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
        console.log('Orden De Servicio Service: OrdenDeServicioId no enviado');
        return {
          status: 400,
          payload: 'OrdenDeServicioId no enviado',
        };
      }

      //Obtener la orden de servicio antes de editar

      const ordenDeServicioBefore =
        await this.ordenServicioRepository.getOrdenDeServicioByData({
          id: ordenDeServicioId,
        });

      if (!ordenDeServicioBefore) {
        return { status: 404, payload: 'La orden de servicio no existe' };
      }

      const { cliente, isDelete, ...cleanedOrdenDeServicioData } =
        ordenDeServicioData;

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
              payload: 'No se pudo crear el cliente.',
            };
          }
        }

        ordenDeServicioData.cliente.clienteId = clienteFinal._id.toString();
      }

      if (isDelete) {
        console.log('Procesando una eliminación de producto');

        // Actualiza directamente sin procesar la lógica de productos
        const ordenDeServicioUpdated =
          await this.ordenServicioRepository.updateOrdenDeServicio(
            ordenDeServicioId,
            cleanedOrdenDeServicioData
          );

        if (!ordenDeServicioUpdated) {
          console.log(
            'Orden De Servicio Service: La orden de servicio no existe'
          );
          return {
            status: 404,
            payload: 'La orden de servicio no existe',
          };
        }

        console.log(
          'Orden De Servicio Service: Orden actualizada como eliminación'
        );
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

        const idsAntiguos = antiguosProductos.map((product) => product.unitId);
        const idsNuevos = nuevosProductos.map((product) => product.unitId);

        // Productos quitados
        const productosQuitados = antiguosProductos.filter((product) => {
          const id = product.unitId;
          return !idsNuevos.includes(id);
        });

        // Productos agregados
        const productosAgregados = nuevosProductos.filter((product) => {
          const id = product.unitId;
          return !idsAntiguos.includes(id);
        });

        // Cambiar estado a "disponible" de productos quitados

        // eslint-disable-next-line no-undef
        await Promise.all(
          productosQuitados.map(async (product) => {
            await this.productRepository.updateUnitProduct(product.unitId, {
              estado: 'disponible',
            });
          })
        );

        // Cambiar estado a "taller" de productos agregados
        // eslint-disable-next-line no-undef
        await Promise.all(
          productosAgregados.map(async (product) => {
            await this.productRepository.updateUnitProduct(product.unitId, {
              estado: 'taller',
            });
          })
        );

        // Validar los datos de la orden de servicio
        const ordenServicioValidated =
          updateOrdenServicioSchema.safeParse(ordenDeServicioData);

        if (!ordenServicioValidated.success) {
          console.log(
            'Orden De Servicio Service: Error de validación de schema de orden de servicio al actualizar',
            ordenServicioValidated.error.format?.() ||
              ordenServicioValidated.error
          );
          return {
            status: 400,
            payload: ordenServicioValidated.error.issues,
          };
        }
      }

      const ordenDeServicioUpdated =
        await this.ordenServicioRepository.updateOrdenDeServicio(
          ordenDeServicioId,
          ordenDeServicioData
        );

      if (!ordenDeServicioUpdated) {
        console.log(
          'Orden De Servicio Service: La orden de servicio no existe'
        );
        return {
          status: 404,
          payload: 'La orden de servicio no existe',
        };
      }

      console.log(
        'Orden De Servicio Service: Orden de servicio actualizada correctamente'
      );
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

      const ordenDeServicio =
        await this.ordenServicioRepository.getOrdenDeServicioByData({
          id: ordenDeServicioId,
        });

      if (!ordenDeServicio) {
        return { status: 404, payload: 'La orden de servicio no existe' };
      }

      // Cambiar el estado de los productos a disponible

      // eslint-disable-next-line no-undef
      await Promise.all(
        ordenDeServicio?.productos?.map(async (producto) => {
          await this.productRepository.updateUnitProduct(producto.unitId, {
            estado: 'disponible',
          });
        })
      );

      const deletedOrdenDeServicio =
        await this.ordenServicioRepository.deleteOrdenDeServicio(
          ordenDeServicioId
        );

      if (!deletedOrdenDeServicio) {
        console.log(
          'Orden De Servicio Service: La orden de servicio no existe'
        );
        return {
          status: 200,
          payload: 'La orden de servicio no existe',
        };
      }

      console.log(
        'Orden De Servicio Service: Orden de servicio eliminada correctamente'
      );
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
      const ordenDeServicio =
        await this.ordenServicioRepository.getOrdenDeServicioByData({
          id: ordenDeServicioId,
        });

      if (!ordenDeServicio) {
        console.log(
          'Orden De Servicio Service: La orden de servicio no existe'
        );
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

      const ordenDeServicioHistoricaCreated =
        await this.ordenServicioHistoricaRepository.createOrdenDeServicioHistorica(
          ordenDeServicioHistorica
        );

      console.log(
        'Orden De Servicio Service: Orden de servicio finalizada correctamente'
      );

      await this.ordenServicioRepository.deleteOrdenDeServicio(
        ordenDeServicioId
      );

      console.log(
        'Orden De Servicio Service: Orden de servicio eliminada correctamente'
      );

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

  async enviarBoletaASunatDeOrdenDeServicio(
    ordenDeServicioId,
    ordenDeServicioData
  ) {
    try {
      // 1. Obtener la orden de servicio
      const ordenDeServicio =
        await this.ordenServicioRepository.getOrdenDeServicioByData({
          id: ordenDeServicioId,
        });
      if (!ordenDeServicio) {
        return {
          status: 404,
          payload: 'Orden de servicio no encontrada',
        };
      }

      // 2. Obtener el contador de boletas
      const numeroBoleta = await this.counterRepository.getCounterByType(
        'boletas'
      );
      if (!numeroBoleta) {
        return {
          status: 500,
          payload: 'No se pudo obtener el contador de boletas',
        };
      }

      // 3. Calcular serie y correlativo
      const { serie, correlativo } = obtenerSerieYCorrelativo(
        numeroBoleta,
        'boleta'
      );

      // 4. Mapear la venta al formato JSON de boleta
      // Datos del cliente
      const { cliente } = ordenDeServicio;
      const { datos } = cliente;
      const { dni, nombres, apellidos } = datos;

      // Datos de la empresa
      const { empresa } = ordenDeServicioData;
      const {
        ruc,
        nombre: razonSocialEmpresa,
        direccion: direccionEmpresa,
        distrito: distritoEmpresa,
        provincia: provinciaEmpresa,
        departamento: departamentoEmpresa,
        ubigeo: ubigeoEmpresa,
      } = empresa;

      // Datos de la orden de servicio
      const detalleProductos = ordenDeServicio.productos.map((product) => {
        const cantidad = product.cantidad;
        const valorUnitario = Number((product.precioVenta / 1.18).toFixed(2));
        const igv = Number((valorUnitario * 0.18).toFixed(2));
        const precioUnitario = Number((valorUnitario + igv).toFixed(2));

        return {
          codProducto: product.code,
          unidad: 'NIU',
          descripcion: product.nombre,
          cantidad,
          mtoValorUnitario: valorUnitario,
          mtoValorVenta: Number((valorUnitario * cantidad).toFixed(2)),
          mtoBaseIgv: Number((valorUnitario * cantidad).toFixed(2)),
          porcentajeIgv: 18,
          igv: Number((igv * cantidad).toFixed(2)),
          tipAfeIgv: 10,
          totalImpuestos: Number((igv * cantidad).toFixed(2)),
          mtoPrecioUnitario: precioUnitario,
        };
      });

      const detalleServicios = ordenDeServicio.servicios.map((servicio) => {
        const valorUnitario = Number((servicio.precio / 1.18).toFixed(2));
        const igv = Number((valorUnitario * 0.18).toFixed(2));
        const precioUnitario = Number((valorUnitario + igv).toFixed(2));

        return {
          codProducto: servicio._id,
          unidad: 'ZZ',
          descripcion: servicio.descripcion,
          cantidad: 1,
          mtoValorUnitario: valorUnitario,
          mtoValorVenta: Number(valorUnitario.toFixed(2)),
          mtoBaseIgv: Number(valorUnitario.toFixed(2)),
          porcentajeIgv: 18,
          igv: Number(igv.toFixed(2)),
          tipAfeIgv: 10,
          totalImpuestos: Number(igv.toFixed(2)),
          mtoPrecioUnitario: precioUnitario,
        };
      });

      
      const detallesCompletos = [...detalleProductos, ...detalleServicios];
      
      const montoOperGravadas = Number(
        detallesCompletos
          .reduce(
            (acumulador, elemento) => acumulador + elemento.mtoValorVenta,
            0
          )
          .toFixed(2)
      );
      const valorDeVenta = montoOperGravadas;
      const montoIGV = Number(
        detallesCompletos
          .reduce((acumulador, elemento) => acumulador + elemento.igv, 0)
          .toFixed(2)
      );
      const subTotal = Number((montoOperGravadas + montoIGV).toFixed(2));
      const montoImpVenta = subTotal;

      const invoiceData = {
        ublVersion: '2.1',
        tipoOperacion: '0101',
        tipoDoc: '03',
        serie,
        correlativo,
        fechaEmision: obtenerFechaEmisionPeru(),
        formaPago: {
          moneda: 'PEN',
          tipo: 'Contado',
        },
        tipoMoneda: 'PEN',
        client: {
          tipoDoc: '03',
          numDoc: dni,
          rznSocial: `${nombres} ${apellidos}`,
          address: {
          },
        },
        company: {
          ruc,
          razonSocial: razonSocialEmpresa,
          nombreComercial: razonSocialEmpresa,
          address: {
            direccion: direccionEmpresa,
            provincia: provinciaEmpresa,
            departamento: departamentoEmpresa,
            distrito: distritoEmpresa,
            ubigueo: ubigeoEmpresa,
          },
        },
        mtoOperGravadas: montoOperGravadas,
        mtoIGV: montoIGV,
        valorVenta: valorDeVenta,
        totalImpuestos: montoIGV,
        subTotal: subTotal,
        mtoImpVenta: montoImpVenta,
        details: detallesCompletos,
        legends: [
          {
            code: '1000',
            value: formatNumeroALetras(montoImpVenta),
          },
        ],
      };

      // 5. Enviar a Sunat
      const sunatResponse = await sendInvoiceToSunat(invoiceData);

      // 6. Si la respuesta es exitosa, actualizar solo estadoSunat
      let estadoSunat = 'Error al enviar a Sunat';
      if (
        sunatResponse &&
        sunatResponse.payload &&
        sunatResponse.payload.sunatResponse &&
        sunatResponse.payload.sunatResponse.cdrResponse
      ) {
        estadoSunat =
          sunatResponse.payload.sunatResponse.cdrResponse.description;
      }

      // 7. Guardar la orden de servicio actualizada
      await this.ordenServicioRepository.updateOrdenDeServicio(ordenDeServicioId, { estadoSunat });

      // 8. Devolver la orden de servicio y la respuesta de Sunat
      const success = estadoSunat !== 'Error al enviar a Sunat';
      return {
        status: 200,
        payload: {
          success,
          estadoSunat,
          sunat: sunatResponse.payload,
        },
      };
    } catch (error) {
      console.error(
        'Orden de Servicio Service: Error al enviar boleta a Sunat:',
        error.message
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
