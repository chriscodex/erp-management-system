import { PreventaRepository } from '@/backend/preventas/domain/repositories/preventaRepository';
import { VentaRepository } from '@/backend/ventas/domain/repositories/ventaRepository.js';

export class VentaService {
  constructor() {
    this.ventaRepository = new VentaRepository();
    this.preventaRepository = new PreventaRepository();
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
        estadoVenta: 'Pendiente',
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
}
