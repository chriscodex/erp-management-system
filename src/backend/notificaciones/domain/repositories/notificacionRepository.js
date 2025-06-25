import mongoose from 'mongoose';

import { Notificacion } from "@/backend/notificaciones/domain/models/notificacion";

export class NotificacionRepository {
  async getNotificacionesActivas() {
    try {

      const currentDate = new Date();

      const notificaciones = await Notificacion.find({
        $or: [
          { closed: false }, // Notificaciones abiertas
          { closed: true, fechaReopening: { $lte: currentDate } } // Closed pero listas para reaparecer
        ],
      }).sort({ createdAt: -1 });;

      if (notificaciones?.length === 0) {
        console.log('Notificacion Repository: No se encontraron notificaciones');
        return [];
      }

      console.log('Notificacion Repository: Notificaciones encontradas');
      return notificaciones;
    } catch (error) {
      console.error(
        `Notificacion Repository: Error al buscar todas las notificaciones: ${error.message}`
      );
      throw new Error(`Error al buscar todas las notificaciones: ${error.message}`);
    }
  }
  async getNotificacionByData(notificacionData) {
    try {
      console.log("Esto sería notificacionData", notificacionData);
      if (!notificacionData) {
        console.log('Notificacion Repository: Usuario no proporcionado');
        return null;
      }

      const filter = {};

      if (notificacionData.id) {
        filter._id = new mongoose.Types.ObjectId(notificacionData.id);
      }

      if (notificacionData.type) {
        filter.type = notificacionData.type;
      }

      if (notificacionData.productId) {
        filter.data = {};
        filter.data.productId = notificacionData.productId;
      }

      if (notificacionData.modeloId) {
        filter.data = {};
        filter.data.modeloId = notificacionData.modeloId;
        filter.data.motoId = notificacionData.motoId;
      }

      if (notificacionData.pedidoId) {
        filter.data = {};
        filter.data.pedidoId = notificacionData.pedidoId;
      }

      if (notificacionData.closed !== undefined) {
        filter.closed = notificacionData.closed;
      }
      console.log("Esto sería filter", filter);

      const notificacionFound = await Notificacion.findOne(filter);

      console.log("esto es notificacionFound", notificacionFound);

      if (!notificacionFound) {
        console.log('Notificacion Repository: Notificacion no encontrada');
        return null;
      }

      console.log('Notificacion Repository: Notificacion encontrada');

      return notificacionFound;

    } catch (error) {
      console.error(
        `Notificacion Repository: Error al buscar la notificacion: ${error.message}`
      );
      throw new Error(`Error al buscar un usuario: ${error.message}`);
    }
  }
  // async create(data) {
  //   return await Notificacion.create(data);
  // }
  async createNotificacion(notificacion) {
    try {
      const newNotificacion = new Notificacion(notificacion);
      const savedNotificacion = await newNotificacion.save();

      console.log('Notificacion Repository: Notificacion creada correctamente');
      return savedNotificacion;
    } catch (error) {
      console.log(`Notificacion Repository: Error al crear notificacion: ${error.message}`);
      throw new Error(`Error al crear notificacion: ${error.message}`);
    }
  }
  async updateNotificacion(notificacionId, notificacionData) {
    try {
      const updatedNotificacion = await Notificacion.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(notificacionId) },
        notificacionData,
        {
          new: true,
        }
      );

      if (!updatedNotificacion) {
        console.log(
          'Notificacion Repository: Notificacion no encontrado para ser actualizado'
        );
        return null;
      }

      console.log('Notificacion Repository: Notificacion actualizado correctamente');
      return updatedNotificacion;
    } catch (error) {
      console.error(
        `Notificacion Repository: Error al actualizar la notificacion: ${error.message}`
      );
      throw new Error(`Error al actualizar la notificacion: ${error.message}`);
    }
  }
  async deleteNotificacion(notificacionId) {
    try {
      const deletedNotificacion = await Notificacion.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(notificacionId),
      });

      if (!deletedNotificacion) {
        console.log(
          'Notificacion Repository: Notificacion no encontrada para ser eliminada'
        );
        return null;
      }

      console.log('Notificacion Repository: Notificacion encontrada y eliminada');
      return deletedNotificacion;
    } catch (error) {
      console.error(
        `Notificacion Repository: Error al eliminar notificacion: ${error.message}`
      );
      throw new Error(`Error al eliminar notificacion: ${error.message}`);
    }
  }
  async close(id) {
    return await Notificacion.findByIdAndUpdate(id, {
      closed: true,
      fechaClosed: new Date()
    });
  }



  // async findLowStock(productoId) {
  //     return await Notificacion.findOne({
  //         type: "low_stock",
  //         "data.productoId": productoId,
  //         close: false
  //     });
  // }

  async findByType(type) {
    return await Notificacion.findOne({ type, close: false });
  }
}