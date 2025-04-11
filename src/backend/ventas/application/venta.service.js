import { PreventaRepository } from '@/backend/preventas/domain/repositories/preventaRepository';
import { VentaRepository } from '@/backend/ventas/domain/repositories/ventaRepository.js';
import { CounterRepository } from '@/backend/counters/domain/repositories/counterRepository';
import { ventasHistoricasRepository } from '@/backend/ventas/domain/repositories/ventasHistoricasRepository';
import { ProductRepository } from '@/backend/products/domain/repositories/productRepository';
import { MotoRepository } from '@/backend/motos/domain/repositories/motoRepository';

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
        cliente: preventa.cliente,
        usuario: preventa.usuario,
        productos: preventa.productos,
        obsequios: preventa.obsequios,
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
        cliente: venta.cliente,
        usuario: venta.usuario,
        productos: venta.productos,
        obsequios: venta.obsequios,
        estadoSunat: venta.estadoSunat,
        comprobante: venta.comprobante,
      };

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
        payload: 'Venta finalizada correctamente',
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
}
