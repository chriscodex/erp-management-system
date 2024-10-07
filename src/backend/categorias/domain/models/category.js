import { Schema, model, models } from 'mongoose';

// Eliminar el modelo en caso no considere los cambios
// if (models.Category) {
//   delete models.Category;
// }

const categorySchema = new Schema(
  {
    nombre: {
      type: String,
      unique: true,
      required: [true, 'nombre es requerido en el schema de categoría'],
    },
    descripcion: {
      type: String,
      required: false,
    },
    estado: {
      type: String,
      required: [true, 'Estado es requerido en el schema de categoría'],
    },
    segmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Segment',
      required: [true, 'SegmentId es requerido en el schema de categoría'],
    },
  },
  {
    timestamps: true,
  }
);

export const Category = models?.Category || model('Category', categorySchema);
