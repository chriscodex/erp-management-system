import mongoose from "mongoose";

import { Cliente } from "@/backend/clientes/domain/models/cliente";

export class ClienteRepository {
  async getAllClientes() {
    try {
      const clientes = await Cliente.find();

      if (clientes?.length === 0) {
        console.log("Cliente Repository: No se encontraron clientes");
        return [];
      }

      console.log("Cliente Repository: Clientes encontrados");
      return clientes;
    } catch (error) {
      console.error(
        `Cliente Repository: Error al buscar todos los clientes: ${error.message}`
      );
      throw new Error(
        `Error al buscar todos los clientes: ${error.message}`
      );
    }
  }
  async getClienteByData(clienteData) {
    console.log(clienteData);
    try {
      if (!clienteData) {
        console.log("Cliente Repository: Cliente no proporcionado");
        return null;
      }

      const filter = {};

      if (clienteData.id) {
        filter._id = new mongoose.Types.ObjectId(
          clienteData.id
        );
      }

      const reservacionFound = await Cliente.findOne(filter);

      if (!reservacionFound) {
        console.log("Cliente Repository: Cliente no encontrado");
        return null;
      }

      console.log("Cliente Repository: Cliente encontrado");
      return reservacionFound;
    } catch (error) {
      console.error(
        `Cliente Repository: Error al buscar un cliente: ${error.message}`
      );
      throw new Error(`Error al buscar un cliente: ${error.message}`);
    }
  }

  
  async createCliente(cliente) {
    try {
      const newCliente = new Cliente(cliente);
      const savedCliente = await newCliente.save();

      console.log("Cliente Repository: Cliente creado correctamente");
      return savedCliente;
    } catch (error) {
      console.log(
        `Cliente Repository: Error al crear el cliente: ${error.message}`
      );
      throw new Error(`Error al crear el cliente: ${error.message}`);
    }
  }
  async updateCliente(clienteId, cliente) {
    try {
      const updatedCliente = await Cliente.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(clienteId) },
        cliente,
        {
          new: true,
        }
      );

      if (!updatedCliente) {
        console.log(
          "Cliente Repository: Cliente no encontrado para ser actualizado"
        );
        return null;
      }

      console.log(
        "Cliente Repository: Cliente actualizado correctamente"
      );
      return updatedCliente;
    } catch (error) {
      console.error(
        `Cliente Repository: Error al actualizar el cliente: ${error.message}`
      );
      throw new Error(`Error al actualizar el cliente: ${error.message}`);
    }
  }
  async deleteCliente(clienteId) {
    try {
      const deletedCliente = await Cliente.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(clienteId),
      });

      if (!deletedCliente) {
        console.log(
          "Cliente Repository: Cliente no encontrado para ser eliminada"
        );
        return null;
      }

      console.log("Cliente Repository: Cliente encontrada y eliminada");
      return deletedCliente;
    } catch (error) {
      console.error(
        `Cliente Repository: Error al eliminar el cliente: ${error.message}`
      );
      throw new Error(`Error al eliminar el cliente: ${error.message}`);
    }
  }
}

