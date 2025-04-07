import { Schema, model, models } from 'mongoose';

const ventasHistoricasSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, 'El code es requerido en el schema de ventas'],
    },
    fecha: {
      type: Date,
      required: [true, 'La fecha es requerida en el schema de ventas'],
    },
    cliente: {
      tipo: {
        type: String,
        required: [true, 'El tipo es requerido en el schema de ventas'],
        enum: ['persona', 'empresa'],
      },
      datos: {
        type: Schema.Types.Mixed,
        required: [true, 'Los datos son requeridos en el schema de ventas'],
      },
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
    estado: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const VentasHistoricas =
  models?.VentasHistoricas || model('VentasHistoricas', ventasHistoricasSchema);
