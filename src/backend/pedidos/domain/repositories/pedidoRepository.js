import mongoose from "mongoose";

import { Pedido } from "@/backend/pedidos/domain/models/pedido";
import { Proveedor } from "@/backend/proveedores/domain/models/proveedor";
import { Almacen } from "@/backend/almacenes/domain/models/almacen";

export class PedidoRepository {
  constructor() {
    this.pedidoModel = Pedido;
    this.proveedorModel = Proveedor;
    this.almacenModel = Almacen;
  }

  async getAllPedidos() {
    try {
      const pedidos = await this.pedidoModel
        .find()
        .populate("proveedorId")
        .populate("almacenId");

      if (pedidos?.length === 0) {
        console.log("Pedido Repository: No se encontraron pedidos");
        return [];
      }

      console.log("Pedido Repository: Pedidos encontrados");
      return pedidos;
    } catch (error) {
      console.error(
        `Pedido Repository: Error al buscar todos los pedidos: ${error.message}`
      );
      throw new Error(
        `Pedido Repository: Error al buscar todos los pedidos: ${error.message}`
      );
    }
  }
  async countAllPedidos() {
    try {
      const totalPedidos = await this.pedidoModel.countDocuments();

      console.log("Pedido Repository: Pedidos contados");
      return totalPedidos;
    } catch (error) {
      console.error(
        `Pedido Repository: Error al contar todos los pedidos: ${error.message}`
      );
      throw new Error(
        `Pedido Repository: Error al contar todos los pedidos: ${error.message}`
      );
    }
  }
  async getAllPedidosByData(pedidoData) {
    try {
      if (!pedidoData) {
        console.log("Pedido Repository: Pedido no proporcionado");
        return null;
      }

      const filter = {};

      if (pedidoData.id) {
        filter._id = new mongoose.Types.ObjectId(pedidoData.id);
      }

      if (pedidoData.modeloId) {
        filter.modeloId = new mongoose.Types.ObjectId(pedidoData.modeloId);
      }

      if (pedidoData.proveedorId) {
        filter.proveedorId = new mongoose.Types.ObjectId(
          pedidoData.proveedorId
        );
      }

      if (pedidoData.almacenId) {
        filter.almacenId = new mongoose.Types.ObjectId(pedidoData.almacenId);
      }
      if (pedidoData.importado) {
        filter.importado = pedidoData.importado;
      }

      const pedidoFound = await this.pedidoModel
        .find(filter)
        .populate("proveedorId")
        .populate("almacenId");

      if (!pedidoFound) {
        console.log("Pedido Repository: Pedidos no encontrados");
        return null;
      }

      console.log("Pedido Repository: Pedidos encontrados");
      return pedidoFound;
    } catch (error) {
      console.error(
        `Pedido Repository: Error al buscar los pedidos: ${error.message}`
      );
      throw new Error(`Error al buscar los pedidos: ${error.message}`);
    }
  }
  async getPedidoByData(pedidoData) {
    try {
      if (!pedidoData) {
        console.log("Pedido Repository: Pedido no proporcionado");
        return null;
      }
      const filter = {};

      if (pedidoData.id) {
        filter._id = new mongoose.Types.ObjectId(pedidoData.id);
      }

      if (pedidoData.modeloId) {
        filter.modeloId = new mongoose.Types.ObjectId(pedidoData.modeloId);
      }

      if (pedidoData.proveedorId) {
        filter.proveedorId = new mongoose.Types.ObjectId(
          pedidoData.proveedorId
        );
      }

      if (pedidoData.almacenId) {
        filter.almacenId = new mongoose.Types.ObjectId(pedidoData.almacenId);
      }

      if (pedidoData.code) {
        filter.code = { $regex: new RegExp(`^${pedidoData.code}$`, "i") };
      }

      if (pedidoData.importado) {
        filter.importado = pedidoData.importado;
      }

      const pedidoFound = await this.pedidoModel
        .findOne(filter)
        .populate("proveedorId")
        .populate("almacenId");

      if (!pedidoFound) {
        console.log("Pedido Repository: Pedido no encontrado");
        return null;
      }
      return pedidoFound;
    } catch (error) {
      console.error(
        `Pedido Repository: Error al buscar el pedido: ${error.message}`
      );
      throw new Error(`Error al buscar el pedido: ${error.message}`);
    }
  }
  async createPedido(pedidoData) {
    try {
      const newPedido = new this.pedidoModel(pedidoData);
      const savedPedido = await newPedido.save();

      const populatedPedido = await savedPedido.populate([
        { path: "proveedorId" },
        { path: "almacenId" },
      ]);

      console.log("Pedido Repository: Pedido creado correctamente");
      return populatedPedido;
    } catch (error) {
      console.log(
        `Pedido Repository: Error al crear el pedido: ${error.message}`
      );
      throw new Error(`Error al crear el pedido: ${error.message}`);
    }
  }
  async updatePedido(pedidoId, pedidoData) {
    try {

      const updatedPedido = await this.pedidoModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(pedidoId) },
        pedidoData,
        {
          new: true,
        }
      );

      if (!updatedPedido) {
        console.log(
          "Pedido Repository: Pedido no encontrado para ser actualizado"
        );
        return null;
      }

      console.log("Pedido Repository: Pedido actualizado correctamente");
      return updatedPedido;
    } catch (error) {
      console.error(
        `Pedido Repository: Error al actualizar el pedido: ${error.message}`
      );
      throw new Error(`Error al actualizar el pedido: ${error.message}`);
    }
  }

  async deletePedido(pedidoId) {
    try {
      const deletedPedido = await this.pedidoModel.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(pedidoId),
      });

      if (!deletedPedido) {
        console.log(
          "Pedido Repository: Pedido no encontrado para ser eliminado"
        );
        return null;
      }

      console.log("Pedido Repository: Pedido encontrado y eliminado");
      return deletedPedido;
    } catch (error) {
      console.error(
        `Pedido Repository: Error al eliminar el pedido: ${error.message}`
      );
      throw new Error(`Error al eliminar el pedido: ${error.message}`);
    }
  }
}
