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
    clienteRuc: {
      type: String,
      required: false,
    },
    usuario: {
      id: {
        type: Schema.Types.ObjectId,
        ref: "User",
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
    sucursalId: {
      type: Schema.Types.ObjectId,
      ref: "Sucursal",
      required: [false],
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
    counter: {
      type: Number,
      required: false,
    },
    estadoSunat: {
      type: String,
      required: true,
    },
    empresa: {
      empresaId: {
        type: Schema.Types.ObjectId,
        ref: "Empresa",
        required: [false, "El id de la empresa es requerido en el schema de ordenes de servicio"],
      },
      ruc: {
        type: String,
        required: [false, "El ruc de la empresa es requerido en el schema de ordenes de servicio"],
      },
      nombre: {
        type: String,
        required: [false, "El nombre de la empresa es requerido en el schema de ordenes de servicio"],
      },
      descripcion: {
        type: String,
        required: false,
      },
      direccion: {
        type: String,
        required: [false, 'La dirección es requerida en el schema de empresa'],
      },
      telefono: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
    }
  },
  {
    timestamps: true,
  }
);

export const Venta = models?.Venta || model('Venta', ventaSchema);
