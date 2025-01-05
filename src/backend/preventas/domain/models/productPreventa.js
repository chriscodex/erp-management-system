import { Schema } from 'mongoose';

export const productoPreventaSchema = new Schema(
  {
    estado: {
      titulo: {
        type: String,
        required: [true, 'El estado es requerido'],
      },
      observaciones: {
        type: String,
        required: false,
      },
    },
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
    gastos: [
      {
        descripcion: {
          type: String,
          required: [true, 'La descripción es requerida'],
        },
        monto: {
          type: Number,
          required: [true, 'El monto es requerido'],
        },
        fecha: {
          type: Date,
          required: [true, 'La fecha es requerida'],
        },
      },
    ],
    precioCompra: {
      type: Number,
      required: [
        true,
        'El precio de compra es requerido',
      ],
      min: [0, 'El precio de compra no puede ser negativo'],
    },
    precioVenta: {
      type: Number,
      required: [true, 'El precio de venta es requerido'],
      min: [0, 'El precio de venta no puede ser negativo'],
    },
    importado: {
      type: String,
      required: [
        true,
        'Indicar si es importado es requerido',
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
        required: false,
      },
    },
    almacen: {
      nombre: {
        type: String,
        required: false,
      },
      ubicación: {
        type: String,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);
