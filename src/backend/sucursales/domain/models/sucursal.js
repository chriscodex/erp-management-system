import { Schema, model, models } from 'mongoose';

const sucursalSchema = new Schema(
  {
    nombre: {
      type: String,
      unique: true,
      required: [true, 'El nombre es requerido en el schema de empresa'],
    },
    descripcion: {
      type: String,
      required: false,
    },
    direccion: {
      type: String,
      required: [true, 'La dirección es requerida en el schema de empresa'],
    },
    telefono: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Sucursal = models?.Sucursal || model('Sucursal', sucursalSchema);
