import { Schema, model, models } from 'mongoose';

// if (models.Proveedor) {
//   delete models.Proveedor;
// }

const proveedorSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'nombre es requerido en el schema de marcas'],
    },
    ruc: {
      type: Number,
      required: false,
    },
    direccion: {
      type: String,
      required: false,
    },
    telefono: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Proveedor =
  models?.Proveedor || model('Proveedor', proveedorSchema);
