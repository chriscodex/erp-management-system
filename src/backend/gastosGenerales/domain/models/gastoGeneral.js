import { Schema, model, models } from 'mongoose';

const gastoGeneralSchema = new Schema(
  {
    descripcion: {
      type: String,
      required: [true, 'La descripción es requerida en el schema de gasto general'],
    },
    monto: {
      type: Number,
      required: [true, 'El monto es requerido en el schema de gasto general'],
    },
    fecha: {
      type: Date,
      required: [true, 'La fecha es requerida en el schema de gasto general'],
    },
  },
  {
    timestamps: true,
  }
);

export const GastoGeneral = models?.GastoGeneral || model('GastoGeneral', gastoGeneralSchema);
