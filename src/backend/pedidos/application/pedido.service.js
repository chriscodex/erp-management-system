import { PedidoRepository } from '@/backend/pedidos/domain/repositories/pedidoRepository';

import { ModeloRepository } from '@/backend/modelos/domain/repositories/modeloRepository';
import { ModeloPedidoRepository } from '@/backend/modelosPedidos/domain/repositories/modeloPedidoRepository';

import { AlmacenRepository } from '@/backend/almacenes/domain/repositories/almacenRepository';
import { ProveedorRepository } from '@/backend/proveedores/domain/repositories/proveedorRepository';
import { MotoRepository } from '@/backend/motos/domain/repositories/motoRepository';
import { PedidoHistoricoRepository } from '@/backend/pedidos/domain/repositories/pedidoHistoricoRepository';

import { createPedidoSchema } from '@/backend/pedidos/application/validations/createPedidoSchema';
import { generarNumeroAleatorio } from '@/lib/utils';
import { updatePedidoSchema } from '@/backend/pedidos/application/validations/updatePedidoSchema';
import { generarCodigoMoto } from '@/backend/motos/application/helpers';
import { generarCodigoUnicoDelModelo } from '@/backend/modelos/application/helpers';

import { NotificacionRepository } from '@/backend/notificaciones/domain/repositories/notificacionRepository';
export class PedidoService {
  constructor() {
    this.pedidoRepository = new PedidoRepository();
    this.modeloRepository = new ModeloRepository();
    this.modeloPedidoRepository = new ModeloPedidoRepository();
    this.almacenRepository = new AlmacenRepository();
    this.proveedorRepository = new ProveedorRepository();
    this.motoRepository = new MotoRepository();
    this.pedidoHistoricoRepository = new PedidoHistoricoRepository();
    this.notificacionRepository = new NotificacionRepository();
  }

  async getAllPedidos() {
    try {
      const pedidos = await this.pedidoRepository.getAllPedidos();

      if (pedidos?.length === 0) {
        console.log('Pedido Service: No se encontraron pedidos');
        return {
          status: 200,
          payload: [],
        };
      }

      console.log('Pedido Service: Pedidos encontrados');
      return {
        status: 200,
        payload: pedidos,
      };
    } catch (error) {
      console.error(
        `Pedido Service: Error interno al buscar todos los pedidos: ${error.message}`,
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async countAllPedidos() {
    try {
      const totalPedidos = await this.pedidoRepository.countAllPedidos();

      console.log('Pedido Service: Pedidos contados');
      return {
        status: 200,
        payload: totalPedidos,
      };
    } catch (error) {
      console.error(
        `Pedido Service: Error interno al contar todos los pedidos: ${error.message}`,
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getAllPedidosByData(pedidoData) {
    try {
      const pedidoFound =
        await this.pedidoRepository.getAllPedidosByData(pedidoData);

      if (!pedidoFound) {
        console.log('Pedido Service: Ningún pedido coincide con los datos');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Pedido Service: Los pedidos existen');
      return {
        status: 200,
        payload: pedidoFound,
      };
    } catch (error) {
      console.error(
        `Pedido Service: Error interno al buscar los pedidos: ${error.message}`,
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getPedidoByData(pedidoData) {
    try {
      const pedidoFound =
        await this.pedidoRepository.getPedidoByData(pedidoData);

      if (!pedidoFound) {
        console.log('Pedido Service: El pedido no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('Pedido Service: El pedido existe');
      return {
        status: 200,
        payload: pedidoFound,
      };
    } catch (error) {
      console.error(
        `Pedido Service: Error interno al buscar el pedido: ${error.message}`,
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async createPedido(pedidoData) {
    try {
      // Validar los datos del pedido enviado con el schema
      const pedidoValidated = createPedidoSchema.safeParse(pedidoData);

      if (!pedidoValidated.success) {
        const formattedErrors = pedidoValidated.error.issues.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        console.log('Pedido Service: Error de validación', formattedErrors);

        return {
          status: 400,
          payload: formattedErrors,
        };
      }

      // Validar si el proveedor existe
      const proveedorFound = await this.proveedorRepository.getProveedorByData({
        id: pedidoData.proveedorId,
      });
      if (!proveedorFound) {
        console.log('Pedido Service: El proveedor no existe');
        return {
          status: 404,
          payload: 'El proveedor no existe',
        };
      }
      console.log('Pedido Service: El proveedor existe');

      // Validar si el almacen existe
      const almacenFound = await this.almacenRepository.getAlmacenByData({
        id: pedidoData.almacenId,
      });
      if (!almacenFound) {
        console.log('Pedido Service: El almacen no existe');
        return {
          status: 404,
          payload: 'El almacen no existe',
        };
      }
      console.log('Pedido Service: El almacen existe');

      const pedidoObject = {
        ...pedidoData,
        code: generarNumeroAleatorio(12),
      };
      // Crear el pedidoo
      const pedidoCreated =
        await this.pedidoRepository.createPedido(pedidoObject);
      console.log('Pedido Service: Pedido creado correctamente');
      return {
        status: 201,
        payload: pedidoCreated,
      };
    } catch (error) {
      console.error(
        `Pedido Service: Error interno al crear un pedido: ${error.message}`,
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async updatePedido(pedidoId, pedidoData) {
    try {
      if (!pedidoId) {
        console.log('Pedido Service: PedidoId no enviado');
        return {
          status: 400,
          payload: 'PedidoId no enviado',
        };
      }
      // Validar los datos del usuario enviado con el schema
      const pedidoValidated = updatePedidoSchema.safeParse(pedidoData);

      if (!pedidoValidated.success) {
        const formattedErrors = pedidoValidated.error.issues.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        console.log('Pedido Service: Error de validación', formattedErrors);

        return {
          status: 400,
          payload: formattedErrors,
        };
      }

      const pedidoUpdated = await this.pedidoRepository.updatePedido(
        pedidoId,
        pedidoData,
      );

      if (!pedidoUpdated) {
        console.log('Pedido Service: El pedido no existe');
        return {
          status: 404,
          payload: 'El pedido no existe',
        };
      }

      console.log('Pedido Service: Pedido actualizado correctamente');
      return {
        status: 200,
        payload: pedidoUpdated,
      };
    } catch (error) {
      console.error(
        `Pedido Service: Error interno al actualizar un pedido: ${error.message}`,
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deletePedido(pedidoId) {
    try {
      const pedidoDeleted = await this.pedidoRepository.deletePedido(pedidoId);

      if (!pedidoDeleted) {
        console.log('Pedido Service: Pedido no encontrado para ser eliminado');
        return {
          status: 404,
          payload: 'El pedido no existe',
        };
      }

      console.log('Pedido Service: Pedido eliminado correctamente');
      return {
        status: 204,
        payload: pedidoDeleted,
      };
    } catch (error) {
      console.error(
        `Pedido Service: Error interno al eliminar el pedido: ${error.message}`,
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }

  async inventariarPedido(pedidoId) {
    try {
      //Traemos el pedido

      const pedido = await this.pedidoRepository.getPedidoByData(pedidoId);

      if (!pedido) {
        console.log(
          'Pedido Service: Pedido no encontrado para ser inventariado.',
        );
        return {
          status: 404,
          payload: 'El pedido no existe',
        };
      }
      //Verificamos si las características vienen como null

      if (
        !pedido?.moto?.caracteristicas ||
        (typeof pedido.moto.caracteristicas.toObject === 'function' &&
          pedido.moto.caracteristicas.toObject() === null)
      ) {
        pedido.moto.caracteristicas = {};
      } else if (typeof pedido.moto.caracteristicas.toObject === 'function') {
        pedido.moto.caracteristicas = pedido.moto.caracteristicas.toObject();
      }

      //Extraemos y transformamos la información del pedido

      const datosModelo = {
        nombre: pedido?.modelo?.nombre,
        descripcion: pedido?.modelo?.descripcion,
        marcaId: pedido?.modelo?.marcaId,
        categoryId: pedido?.modelo?.categoryId,
      };

      //Verificamos si el modelo existe
      const modeloFound =
        await this.modeloRepository.getModeloByData(datosModelo);

      let modeloId;

      //Crear modelo si no existe
      if (!modeloFound) {
        console.log('Pedido Service: El modelo no existe en inventario');

        const modeloCode = await generarCodigoUnicoDelModelo(
          this.modeloRepository,
        );
        const modeloObject = {
          ...datosModelo,
          code: modeloCode,
          stockMinimo: 1,
          estado: 'activo',
        };
        const modeloCreated =
          await this.modeloRepository.createModelo(modeloObject);

        modeloId = modeloCreated._id;
        const modeloPedidoFound =
          await this.modeloPedidoRepository.getModeloPedidoByData(datosModelo);

        console.log('modeloPedidoFound', modeloPedidoFound);

        if (modeloPedidoFound) {
          await this.modeloPedidoRepository.deleteModeloPedido(
            modeloPedidoFound._id,
          );
        }
      } else {
        console.log('Pedido Service: El modelo ya existe en inventario.');
        modeloId = modeloFound._id;
      }

      const motoCode = await generarCodigoMoto();

      const datosMoto = {
        code: motoCode,
        estado: {
          titulo: 'disponible',
          observaciones: '',
        },
        nombre: pedido?.moto?.nombre,
        descripcion: pedido?.moto?.descripcion,
        caracteristicas: pedido?.moto?.caracteristicas ?? {},
        precioCompra: pedido?.montoTotal,
        precioVenta: pedido?.montoTotal,
        importado: pedido?.moto?.importado,
        modeloId: modeloId,
        proveedorId: pedido?.proveedorId?._id,
        almacenId: pedido?.almacenId?._id,
        gastos: [],
      };

      //Crear moto

      const motoCreated = await this.motoRepository.createMoto(datosMoto);

      //Crear pedido historico
      const pedidoObject = pedido.toObject(); // Convierte el documento Mongoose a un objeto plano
      delete pedidoObject._id;

      const pedidoHistoricoCreated =
        await this.pedidoHistoricoRepository.createPedidoHistorico(
          pedidoObject,
        );

      //Eliminar notificación del pedido si existe
      const notificacion =
        await this.notificacionRepository.getNotificacionByData({
          type: 'expired_pedido',
          pedidoId: pedido._id,
        });
      if (notificacion) {
        await this.notificacionRepository.deleteNotificacion(notificacion._id);
      }

      //Eliminar pedido tras inventariarlo y mandarlo al historial

      await this.pedidoRepository.deletePedido(pedidoId);
      console.log('Pedido Service: Pedido eliminado tras ser inventariado.');

      return {
        status: 201,
        payload: { moto: motoCreated, pedidoHistorico: pedidoHistoricoCreated },
      };
    } catch (error) {
      console.error(
        `Pedido Service: Error interno al inventariar el pedido: ${error.message}`,
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
