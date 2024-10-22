import { Schema, model, models } from 'mongoose';

// // Eliminar el modelo en caso no considere los cambios
// if (models.Empresa) {
//   delete models.Empresa;
// }

const empresaSchema = new Schema(
  {
    nombre: {
      type: String,
      unique: true,
      required: [true, 'El nombre es requerido en el schema de empresa'],
    },
    ruc: {
      type: String,
      unique: true,
      required: [true, 'El ruc es requerido en el schema de empresa'],
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

export const Empresa = models?.Empresa || model('Empresa', empresaSchema);
