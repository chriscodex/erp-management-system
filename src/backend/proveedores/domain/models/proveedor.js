import { Schema, model, models } from 'mongoose';

const proveedorSchema = new Schema(
  {
    nombre: {
      type: String,
      unique: true,
      required: [true, 'nombre es requerido en el schema de proveedores'],
    },
    ruc: {
      type: String,
      unique: true,
      required: false,
    },
    direccion: {
      type: String,
      required: false,
    },
    celular: {
      type: String,
      required: false,
    },
    estado: {
      type: String,
      required: [true, 'Estado es requerido en el schema de proveedores'],
      enum: ['activo', 'inactivo'],
    },
  },
  {
    timestamps: true,
  },
);

export const Proveedor =
  models?.Proveedor || model('Proveedor', proveedorSchema);
