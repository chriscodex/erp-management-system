import { Schema, model, models } from 'mongoose';

const clienteSchema = new Schema(
  {
    tipo: {
      type: String,
      required: [true, 'El tipo es requerido en el schema de cliente'],
      enum: ['persona', 'empresa'],
    },
    datos: {
      type: Schema.Types.Mixed,
      required: [true, 'Los datos son requeridos en el schema de cliente'],
    },
  },
  {
    timestamps: true,
  },
);

export const Cliente = models?.Cliente || model('Cliente', clienteSchema);
