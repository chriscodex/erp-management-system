import { PreventaRepository } from '@/backend/preventas/domain/repositories/preventaRepository';
import { VentaRepository } from '@/backend/ventas/domain/repositories/ventaRepository.js';
import { CounterRepository } from '@/backend/counters/domain/repositories/counterRepository';
import { ventasHistoricasRepository } from '@/backend/ventas/domain/repositories/ventasHistoricasRepository';
import { ProductRepository } from '@/backend/products/domain/repositories/productRepository';
import { MotoRepository } from '@/backend/motos/domain/repositories/motoRepository';
import { sendInvoiceToSunat } from '@/backend/shared/apisPeru.js';
import { obtenerSerieYCorrelativo } from '@/lib/formateador.js';

export class VentaService {
  constructor() {
    this.ventaRepository = new VentaRepository();
    this.preventaRepository = new PreventaRepository();
    this.ventasHistoricasRepository = new ventasHistoricasRepository();
    this.productRepository = new ProductRepository();
    this.counterRepository = new CounterRepository();
    this.motoRepository = new MotoRepository();
  }

  async getAllVentas() {
    try {
      const ventas = await this.ventaRepository.getAllVentas();

      if (ventas?.length === 0) {
        console.log('Venta Service: No se encontraron ventas');
        return {
          status: 200,
          payload: [],
        };
      }

      console.log('Venta Service: Ventas encontradas');
      return {
        status: 200,
        payload: ventas,
      };
    } catch (error) {
      console.error(
        `Venta Service: Error interno al buscar todas las ventas: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }

  async getVentaByData(ventaData) {
    try {
      const ventaFound = await this.ventaRepository.getVentaByData(ventaData);

      if (!ventaFound) {
        console.log('Venta Service: La venta no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Venta Service: La venta existe');
      return {
        status: 200,
        payload: ventaFound,
      };
    } catch (error) {
      console.error(
        `Venta Service: Error interno al buscar la venta: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }

  async createVenta(preventaId) {
    try {
      const preventa = await this.preventaRepository.getPreventaByData({
        id: preventaId,
      });

      if (!preventa) {
        console.log('Venta Service: Preventa no encontrada');
        return {
          status: 404,
          payload: 'Preventa no encontrada',
        };
      }

      const nuevaVenta = {
        code: preventa.code,
        fecha: new Date(),
        clienteId: preventa.clienteId,
        usuario: preventa.usuario,
        sucursalId: preventa.sucursalId,
        productos: preventa.productos,
        obsequios: preventa.obsequios,
        comentarios: preventa.comentarios,
        comprobante: 'No impreso',
        estadoSunat: 'Por enviar',
      };

      const newVenta = await this.ventaRepository.createVenta(nuevaVenta);
      console.log('Venta Service: Venta creada correctamente');

      await this.preventaRepository.deletePreventa(preventaId);
      console.log('Preventa Service: Preventa eliminada correctamente');

      return {
        status: 201,
        payload: newVenta,
      };
    } catch (error) {
      console.log(`Venta Service: Error interno al crear una venta ${error}`);
      return {
        status: 400,
        payload: error,
      };
    }
  }

  async updateVenta(ventaId, ventaData) {
    try {
      const updatedVenta = await this.ventaRepository.updateVenta(
        ventaId,
        ventaData
      );
      return updatedVenta;
    } catch (error) {
      console.error(
        `Venta Service: Error interno al actualizar la venta: ${error.message}`
      );
      throw new Error(`Error al actualizar la venta: ${error.message}`);
    }
  }

  async deleteVenta(ventaId) {
    try {
      const deletedVenta = await this.ventaRepository.deleteVenta(ventaId);

      if (!deletedVenta) {
        console.log('Venta Service: La venta no existe');
        return {
          status: 200,
          payload: 'La venta no existe',
        };
      }

      console.log('Venta Service: La venta eliminada correctamente');
      return {
        status: 204,
        payload: deletedVenta,
      };
    } catch (error) {
      console.error(
        `Venta Service: Error interno al eliminar la venta: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }

  async getCounterBoleta() {
    try {
      const counter = await this.counterRepository.getCounterByType('boletas');
      return {
        status: 200,
        payload: counter,
      };
    } catch (error) {
      console.error(
        `Venta Service: Error interno al obtener el contador de boleta: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }

  async getCounterFactura() {
    try {
      const counter = await this.counterRepository.getCounterByType('facturas');
      return {
        status: 200,
        payload: counter,
      };
    } catch (error) {
      console.error(
        `Venta Service: Error interno al obtener el contador de boleta: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }

  async finalizarVenta(ventaId) {
    try {
      const venta = await this.ventaRepository.getVentaByData({
        id: ventaId,
      });

      if (!venta) {
        console.log('Venta Service: La venta no existe');
        return {
          status: 200,
          payload: 'La venta no existe',
        };
      }

      const ventaHistorica = {
        code: venta.code,
        fecha: venta.fecha,
        clienteId: venta.clienteId,
        usuario: venta.usuario,
        sucursalId: venta.sucursalId,
        productos: venta.productos,
        obsequios: venta.obsequios,
        estadoSunat: venta.estadoSunat,
        comprobante: venta.comprobante,
        counter: venta.counter,
      };

      const ventaHistoricaCreated =
        await this.ventasHistoricasRepository.createVentaHistorica(
          ventaHistorica
        );
      console.log('Venta Service: Venta finalizada correctamente');

      await this.ventaRepository.deleteVenta(ventaId);
      console.log('Venta Service: Venta eliminada correctamente');

      // Eliminar los productos del inventario
      // eslint-disable-next-line no-undef
      await Promise.all(
        venta?.productos?.map(async (producto) => {
          if (producto.modeloId) {
            await this.motoRepository.deleteMoto(producto._id);
          } else {
            await this.productRepository.deleteSingleUnitFromProduct(
              producto.productId,
              producto.unitId
            );
          }
        })
      );

      return {
        status: 201,
        payload: {
          message: 'Venta finalizada correctamente',
          _id: ventaHistoricaCreated._id,
        },
      };
    } catch (error) {
      console.error(
        `Venta Service: Error interno al finalizar la venta: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }

  async enviarBoletaASunat(ventaId) {
    try {
      // 1. Obtener la venta
      const venta = await this.ventaRepository.getVentaByData({ id: ventaId });
      if (!venta) {
        return {
          status: 404,
          payload: 'Venta no encontrada',
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
      // NOTA: Aquí debes adaptar los campos según tu modelo de venta y el formato requerido
      const invoiceData = {
        ublVersion: '2.1',
        tipoOperacion: '0101',
        tipoDoc: '03',
        serie,
        correlativo,
        fechaEmision: '2021-01-27T00:00:00-05:00',
        formaPago: {
          moneda: 'PEN',
          tipo: 'Contado',
        },
        tipoMoneda: 'PEN',
        client: {
          tipoDoc: '6',
          numDoc: 20000000002,
          rznSocial: 'Cliente',
          address: {
            direccion: 'Direccion cliente',
            provincia: 'LIMA',
            departamento: 'LIMA',
            distrito: 'LIMA',
            ubigueo: '150101',
          },
        },
        company: {
          ruc: 10740621063,
          razonSocial: 'Mi empresa',
          nombreComercial: 'Mi empresa',
          address: {
            direccion: 'Direccion empresa',
            provincia: 'LIMA',
            departamento: 'LIMA',
            distrito: 'LIMA',
            ubigueo: '150101',
          },
        },
        mtoOperGravadas: 100,
        mtoIGV: 18,
        valorVenta: 100,
        totalImpuestos: 18,
        subTotal: 118,
        mtoImpVenta: 118,
        details: [
          {
            codProducto: 'P001',
            unidad: 'NIU',
            descripcion: 'PRODUCTO 1',
            cantidad: 2,
            mtoValorUnitario: 50,
            mtoValorVenta: 100,
            mtoBaseIgv: 100,
            porcentajeIgv: 18,
            igv: 18,
            tipAfeIgv: 10,
            totalImpuestos: 18,
            mtoPrecioUnitario: 59,
          },
        ],
        legends: [
          {
            code: '1000',
            value: 'SON CIENTO DIECIOCHO CON 00/100 SOLES',
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

      // 7. Guardar la venta actualizada
      await this.ventaRepository.updateVenta(ventaId, { estadoSunat });

      // 8. Devolver la venta y la respuesta de Sunat
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
        'Venta Service: Error al enviar boleta a Sunat:',
        error.message
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
