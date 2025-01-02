import { Schema, model, models } from 'mongoose';
import { motoVendidaSchema } from '@/backend/ventas/domain/models/motoVendida';
import { productoVendidoSchema } from '@/backend/ventas/domain/models/productoVendido';

// Esquema base para los elementos del array de productos
const productoVentaBaseSchema = new Schema(
  {
    tipo: {
      type: String,
      required: true,
      enum: ['moto', 'producto'],
    },
  },
  { discriminatorKey: 'tipo', _id: false }
);

const ventaSchema = new Schema(
  {
    estado: {
      type: String,
      required: [true, 'Estado es requerido en el schema de ventas'],
    },
    code: {
      type: String,
      required: [true, 'El code es requerido en el schema de ventas'],
    },
    fecha: {
      type: Date,
      required: [true, 'La fecha es requerida en el schema de ventas'],
    },
    clienteId: {
      type: Schema.Types.ObjectId,
      ref: 'Cliente',
      required: [true, 'clienteId es requerido en el schema de ventas'],
    },
    productosVenta: [productoVentaBaseSchema],
    obsequios: [
      {
        code: {
          type: String,
          required: true,
          unique: true,
        },
        nombre: {
          type: String,
          unique: true,
          required: [true, 'El nombre es requerido'],
        },
        descripcion: {
          type: String,
          required: false,
        },
        precioCompra: {
          type: Number,
          required: [
            true,
            'El precio de compra es requerido en el schema de venta',
          ],
          min: [0, 'El precio de compra no puede ser negativo'],
        },
        importado: {
          type: String,
          required: [
            true,
            'Indicar si es importado es requerido en el schema de motos',
          ],
          enum: ['si', 'no'],
        },
        marcaNombre: {
          type: String,
          required: false,
        },
        categoriaNombre: {
          type: String,
          required: false,
        },
        proveedor: {
          razonSocial: {
            type: String,
            required: false,
          },
          ruc: {
            type: String,
            required: true,
          },
        },
        almacen: {
          nombre: {
            type: String,
            required: true,
          },
          ubicación: {
            type: String,
            required: true,
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Crear el modelo base para productos
export const ProductoVentaBase =
  models?.ProductoVentaBase ||
  model('ProductoVentaBase', productoVentaBaseSchema);

// Agregar discriminadores
export const MotoVendida =
  models.MotoVendida ||
  ProductoVentaBase.discriminator('MotoVendida', motoVendidaSchema);
  
export const ProductoVendido =
  models.ProductoVendido ||
  ProductoVentaBase.discriminator('ProductoVendido', productoVendidoSchema);

export const Venta = models?.Venta || model('Venta', ventaSchema);
