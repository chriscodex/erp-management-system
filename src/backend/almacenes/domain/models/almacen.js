import { Schema, model, models } from 'mongoose';

// // Eliminar el modelo en caso no considere los cambios
// if (models.Almacen) {
//   delete models.Almacen;
// }

const almacenSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'nombre es requerido en el schema de almacen'],
    },
    descripcion: {
      type: String,
      required: false,
    },
    ubicacion: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      required: [true, 'Estado es requerido en el schema de almacen'],
    },
  },
  {
    timestamps: true,
  },
);

export const Almacen = models?.Almacen || model('Almacen', almacenSchema);
