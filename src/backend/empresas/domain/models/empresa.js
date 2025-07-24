import { Schema, model, models } from 'mongoose';

const empresaSchema = new Schema(
  {
    ruc: {
      type: String,
      unique: true,
      required: [true, 'El ruc es requerido en el schema de empresa'],
    },
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
    distrito: {
      type: String,
      required: [true, 'El distrito es requerido en el schema de empresa'],
    },
    provincia: {
      type: String,
      required: [true, 'La provincia es requerida en el schema de empresa'],
    },
    ubigeo: {
      type: String,
      required: [true, 'El ubigeo es requerido en el schema de empresa'],
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

export const Empresa = models?.Empresa || model('Empresa', empresaSchema);
