import { Schema, model, models } from 'mongoose';

const gastoSchema = new Schema({
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
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'productId es requerido'],
  },
});

export const Gasto = models?.Gasto || model('Gasto', gastoSchema);