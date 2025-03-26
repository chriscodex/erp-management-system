import mongoose from "mongoose";

import { Reservacion } from "@/backend/reservaciones/domain/models/reservacion";

export class ReservacionRepository {
  async getAllReservaciones() {
    try {
      const reservaciones = await Reservacion.find();

      if (reservaciones?.length === 0) {
        console.log("Reservacion Repository: No se encontraron reservaciones");
        return [];
      }

      console.log("Reservacion Repository: Reservaciones encontradas");
      return reservaciones;
    } catch (error) {
      console.error(
        `Reservacion Repository: Error al buscar todos las reservaciones: ${error.message}`
      );
      throw new Error(
        `Error al buscar todos las reservaciones: ${error.message}`
      );
    }
  }
  async getReservacionByData(reservacionData) {
    console.log(reservacionData);
    try {
      if (!reservacionData) {
        console.log("Reservacion Repository: Reservación no proporcionada");
        return null;
      }

      const filter = {};

      if (reservacionData.pagoInicial) {
        filter._pagoInicial = new mongoose.Types.ObjectId(
          reservacionData.pagoInicial
        );
      }

      const reservacionFound = await Reservacion.findOne(filter);

      if (!reservacionFound) {
        console.log("Reservacion Repository: Reservación no encontrada");
        return null;
      }

      console.log("Reservacion Repository: Reservación encontrada");
      return reservacionFound;
    } catch (error) {
      console.error(
        `Reservacion Repository: Error al buscar una reservación: ${error.message}`
      );
      throw new Error(`Error al buscar una reservación: ${error.message}`);
    }
  }

  
  async createReservacion(reservacion) {
    try {
      const newReservacion = new Reservacion(reservacion);
      const savedReservacion = await newReservacion.save();

      console.log("Reservacion Repository: Reservación creada correctamente");
      return savedReservacion;
    } catch (error) {
      console.log(
        `Reservacion Repository: Error al crear reservación: ${error.message}`
      );
      throw new Error(`Error al crear reservación: ${error.message}`);
    }
  }






  async updateReservacion(reservacionId, reservacion) {
    try {
      const updatedReservacion = await Reservacion.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(reservacionId) },
        reservacion,
        {
          new: true,
        }
      );

      if (!updatedReservacion) {
        console.log(
          "Reservacion Repository: Reservación no encontrada para ser actualizada"
        );
        return null;
      }

      console.log(
        "Reservacion Repository: Reservación actualizada correctamente"
      );
      return updatedReservacion;
    } catch (error) {
      console.error(
        `Reservacion Repository: Error al actualizar reservación: ${error.message}`
      );
      throw new Error(`Error al actualizar reservación: ${error.message}`);
    }
  }
  async deleteReservacion(reservacionId) {
    try {
      const deletedReservacion = await Reservacion.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(reservacionId),
      });

      if (!deletedReservacion) {
        console.log(
          "Reservacion Repository: Reservación no encontrada para ser eliminada"
        );
        return null;
      }

      console.log("Reservacion Repository: Reservación encontrada y eliminada");
      return deletedReservacion;
    } catch (error) {
      console.error(
        `Reservacion Repository: Error al eliminar reservación: ${error.message}`
      );
      throw new Error(`Error al eliminar reservación: ${error.message}`);
    }
  }
}
