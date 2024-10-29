import { Schema, model, models } from 'mongoose';

const productUnitSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    estado: {
      type: String,
      required: [true, 'El estado es requerido en el schema de productos'],
      enum: ['activo', 'inactivo'],
    },
  },
  { timestamps: true }
);

export const ProductUnit =
  models?.ProductUnit || model('ProductUnit', productUnitSchema);
