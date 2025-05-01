import { Schema, model, models } from 'mongoose';

const ventaSchema = new Schema(
  {
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
      ref: "Cliente",
      required: [true, "El cliente es requerido en el schema de preventas."],
    },
    usuario: {
      id: {
        type: Schema.Types.ObjectId,
        required: [true, 'El id es requerido en el schema de ventas'],
      },
      dni: {
        type: String,
        required: [true, 'El dni es requerido en el schema de ventas'],
      },
      rol: {
        type: String,
        required: [true, 'El rol es requerido en el schema de ventas'],
      },
      nombres: {
        type: String,
        required: [true, 'Los nombres son requeridos en el schema de ventas'],
      },
      apellidos: {
        type: String,
        required: [true, 'Los apellidos son requeridos en el schema de ventas'],
      },
    },
    comentarios: {
      type: String,
      required: false,
    },
    productos: [
      {
        type: Schema.Types.Mixed,
        required: [true, 'Los productos son requeridos en el schema de ventas'],
      },
    ],
    obsequios: [
      {
        type: Schema.Types.Mixed,
        required: false,
      },
    ],
    comprobante: {
      type: String,
      required: true,
    },
    estadoSunat: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Venta = models?.Venta || model('Venta', ventaSchema);
