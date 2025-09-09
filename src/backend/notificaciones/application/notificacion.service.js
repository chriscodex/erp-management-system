import { startOfMonth, endOfMonth, isSameMonth } from 'date-fns';

import { NotificacionRepository } from "@/backend/notificaciones/domain/repositories/notificacionRepository";
import { ProductRepository } from "@/backend/products/domain/repositories/productRepository";
import { VentaRepository } from "@/backend/ventas/domain/repositories/ventaRepository";
import { ventasHistoricasRepository } from "@/backend/ventas/domain/repositories/ventasHistoricasRepository";
import { MotoRepository } from '@/backend/motos/domain/repositories/motoRepository';
import { PedidoRepository } from '@/backend/pedidos/domain/repositories/pedidoRepository';
import { createNotificacionSchema } from "@/backend/notificaciones/application/validations/createNotificacionSchema";
import { formatDateShort } from '@/lib/formateador';
export class NotificacionService {
  constructor() {
    this.notificacionRepository = new NotificacionRepository();
    this.productRepository = new ProductRepository();
    this.ventaRepository = new VentaRepository();
    this.ventaHistoricaRepository = new ventasHistoricasRepository();
    this.motoRepository = new MotoRepository();
    this.pedidoRepository = new PedidoRepository();
  }

  async checkAndSyncNotificaciones() {
    await this.checkLowStock();
    await this.checkHighSales();
    await this.checkBikeRepairOrAssembly();
    await this.checkExpiredPedidos();
    return this.getAllNotificaciones();
    // return this.notificacionRepository.getNotificacionesActivas();
  }

  async getAllNotificaciones() {
    try {
      const notificaciones = await this.notificacionRepository.getNotificacionesActivas();

      if (notificaciones?.length === 0) {

        console.log('Notificacion Service: No se encontraron notificaciones');
        return {
          status: 200,
          payload: [],
        };
      }

      console.log('Notificacion Service: Notificaciones encontradas');
      return {
        status: 200,
        payload: notificaciones,
      };
    } catch (error) {
      console.error(
        `Notificacion Service: Error interno al buscar todos los notificaciones: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getNotificacionByData(notificacionData) {
    try {
      const notificacionFound = await this.notificacionRepository.getNotificacionByData(notificacionData);

      if (!notificacionFound) {
        console.log('Notificacion Service: La notificacion no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Notificacion Service: La notificacion existe');
      return {
        status: 200,
        payload: notificacionFound,
      };
    } catch (error) {
      console.error(
        `Notificacion Service: Error interno al buscar la notificacion: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async createNotificacion(notificacion) {
    try {

      const notificacionValidated = createNotificacionSchema.safeParse(notificacion);

      if (!notificacionValidated.success) {
        console.log(
          'Notificacion Service: Error de validación de schema de notificacion al crear'
        );
        return {
          status: 400,
          payload: notificacionValidated.error.issues,
        };
      }

      // Validar si la notificacion existe
      const notificacionFound = await this.notificacionRepository.getNotificacionByData(notificacion);
      if (notificacionFound) {
        console.log('Notificacion Service: La notificacion ya existe');
        return {
          status: 409,
          payload: 'La notificacion ya existe',
        };
      }

      // Crear el objeto de notificacion
      const notificacionObject = {
        ...notificacion,
      };

      // Crear la notificacion
      const notificacionCreated = await this.notificacionRepository.createNotificacion(notificacionObject);

      const notificacionCreatedObject = notificacionCreated.toObject();

      console.log('Notificacion Service: Notificacion creada correctamente');

      return {
        status: 201,
        payload: notificacionCreatedObject,
      };
    } catch (error) {
      console.error(
        `Notificacion Service: Error interno al crear una notificacion: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }

  async updateNotificacion(notificacionId, notificacionData) {
    try {

      if (notificacionData.closed === true) {
        const daysInMs = 3 * 24 * 60 * 60 * 1000;
        const fechaClosed = new Date();
        const fechaReopening = new Date(fechaClosed.getTime() + daysInMs); 

        notificacionData.fechaClosed = fechaClosed;
        notificacionData.fechaReopening = fechaReopening;

      } else if (notificacionData.closed === false) {
        // Limpiar las fechas
        notificacionData.fechaClosed = undefined; 
        notificacionData.fechaReopening = undefined; 
      }

      // Validar los datos del de la notificación con el schema
      const notificacionValidated = createNotificacionSchema.safeParse(notificacionData);

      if (!notificacionValidated.success) {
        console.log(
          'Notificacion Service: Error de validación de schema de notificacion al remover'
        );
        return {
          status: 400,
          payload: notificacionValidated.error.issues,
        };
      }
      const notificacionUpdated = await this.notificacionRepository.updateNotificacion(
        notificacionId,
        notificacionData
      );

      if (!notificacionUpdated) {
        console.log('Notificacion Service: La notificacion no existe');
        return {
          status: 200,
          payload: notificacionUpdated,
        };
      }

      console.log('Notificacion Service: Notificacion removida correctamente');
      return {
        status: 200,
        payload: notificacionUpdated,
      };
    } catch (error) {
      console.error(
        `Notificacion Service: Error interno al remover una notificacion: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }

  async deleteNotificacion(notificacionId) {
    try {
      const notificacionDeleted = await this.notificacionRepository.deleteNotificacion(notificacionId);

      if (!notificacionDeleted) {
        console.log('Notificacion Service: La notificacion no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Notificacion Service: Notificacion eliminada correctamente');
      return {
        status: 204,
        payload: notificacionDeleted,
      };
    } catch (error) {
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async checkLowStock() {
    const productos = await this.productRepository.getAllProducts();
    for (const product of productos) {
      const isLow = product.stock <= product.stockMinimo;
      const notificationExists = await this.notificacionRepository.getNotificacionByData({ type: "low_stock", productId: product._id });
      //Crear la notificación si no existe
      if (isLow && !notificationExists) {
        await this.notificacionRepository.createNotificacion({
          title: "Stock bajo",
          message: `El Producto ${product.nombre} cuenta con solo ${product.stock} unidades.`,
          type: "low_stock",
          fecha: new Date(),
          closed: false,
          fechaClosed: undefined,
          fechaReopening: undefined,
          data: { productId: product._id }
        });
      }
      //Eliminarla si ya se subsanó el stock
      if (!isLow && notificationExists) {
        await this.notificacionRepository.deleteNotificacion(notificationExists._id);
      }
    }
  }

  async checkHighSales() {

    const inicioDelMes = startOfMonth(new Date());
    const finDelMes = endOfMonth(new Date());

    const totalVentasMes = await this.ventaRepository.getVentasInDateRange(inicioDelMes, finDelMes);

    const totalVentasHistoricasMes = await this.ventaHistoricaRepository.getVentasHistoricasInDateRange(inicioDelMes, finDelMes);

    // const total = totalVentas + totalVentasHistoricas;

    const total = [...totalVentasMes, ...totalVentasHistoricasMes].reduce((total, venta) => {
      const totalVenta = venta.productos.reduce((sum, producto) => {
        return sum + (producto.precioVenta * (producto.cantidad || 1));
      }, 0);
      return total + totalVenta;
    }, 0);

    const notificationExists = await this.notificacionRepository.getNotificacionByData({ type: "high_sales" });

    // Eliminar la notificación si ya existe y es de otro mes
    if (notificationExists && !isSameMonth(new Date(notificationExists.fecha), new Date())) {
      await this.notificacionRepository.deleteNotificacion(notificationExists._id);
    }
    //Eliminar la notificación si ya existe y el total es menor a 130000
    if (total <= 130000 && notificationExists) {
      await this.notificacionRepository.deleteNotificacion(notificationExists._id);
    }
    //Crea la notificación si no existe

    if (total > 130000 && !notificationExists) {
      await this.notificacionRepository.createNotificacion({
        title: "Ventas altas",
        message: `Las ventas del mes superan los S/ 150,000.`,
        type: "high_sales",
        fecha: new Date(),
        closed: false,
        fechaClosed: undefined,
        fechaReopening: undefined,
        data: { month: new Date().getMonth(), year: new Date().getFullYear() }
      });
    }
  }

  async checkBikeRepairOrAssembly() {
    const motos = await this.motoRepository.getAllMotos();
    for (const moto of motos) {

      const { titulo } = moto.estado;

      const needsRepair = titulo === "dañado";
      const needsAssembly = titulo === "desarmado";

      const notificationExists = await this.notificacionRepository.getNotificacionByData({ type: "bike_needs", modeloId: moto.modeloId._id, motoId: moto._id });
      //Crear la notificación si no existe
      if ((needsRepair || needsAssembly) && !notificationExists) {
        await this.notificacionRepository.createNotificacion({
          title: "Una moto necesita atención",
          message: `La moto ${moto.nombre} necesita ser ${needsRepair ? "reparada" : "ensamblada"}.`,
          type: "bike_needs",
          fecha: new Date(),
          closed: false,
          fechaClosed: undefined,
          fechaReopening: undefined,
          data: {
            modeloId: moto.modeloId._id,
            motoId: moto._id
          }
        });
      }
      //Eliminarla si ya se reparó o armó la moto
      if (!(needsRepair || needsAssembly) && notificationExists) {
        await this.notificacionRepository.deleteNotificacion(notificationExists._id);
      }
    }
  }

  async checkExpiredPedidos() {
    const pedidos = await this.pedidoRepository.getAllPedidos();
    for (const pedido of pedidos) {

      const expired = new Date() > pedido.fechaLimite;

      const notificationExists = await this.notificacionRepository.getNotificacionByData({ type: "expired_pedido", pedidoId: pedido._id });

      //Crear la notificación si no existe
      if (expired && !notificationExists) {
        await this.notificacionRepository.createNotificacion({
          title: "Pedido atrasado",
          message: `El pedido ${pedido.code} excedió su fecha límite desde el ${formatDateShort(pedido.fechaLimite, false)}`,
          type: "expired_pedido",
          fecha: new Date(),
          closed: false,
          fechaClosed: undefined,
          fechaReopening: undefined,
          data: { pedidoId: pedido._id }
        });
      }
    }
  }

}