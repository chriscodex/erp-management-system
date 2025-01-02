import { Schema } from 'mongoose';

export const motoVendidaSchema = new Schema(
  {
    estado: {
      titulo: {
        type: String,
        required: [true, 'El estado es requerido en el schema de motos'],
      },
      observaciones: {
        type: String,
        required: false,
        maxlength: [500, 'La observación no puede tener más de 500 caracteres'],
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
      required: [true, 'El nombre es requerido en el schema de moto'],
    },
    descripcion: {
      type: String,
      required: false,
    },
    gastos: [
      {
        descripcion: {
          type: String,
          required: [true, 'La descripción es requerida en el schema de motos'],
        },
        monto: {
          type: Number,
          required: [true, 'El monto es requerido en el schema de motos'],
        },
        fecha: {
          type: Date,
          required: [true, 'La fecha es requerida en el schema de motos'],
        },
      },
    ],
    precioCompra: {
      type: Number,
      required: [
        true,
        'El precio de compra es requerido en el schema de motos',
      ],
      min: [0, 'El precio de compra no puede ser negativo'],
    },
    precioVenta: {
      type: Number,
      required: [true, 'El precio de venta es requerido en el schema de motos'],
      min: [0, 'El precio de venta no puede ser negativo'],
    },
    importado: {
      type: String,
      required: [
        true,
        'Indicar si es importado es requerido en el schema de motos',
      ],
      enum: ['si', 'no'],
    },
    modeloNombre: {
      type: String,
      required: false,
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
