import { Schema, model, models } from 'mongoose';

// Eliminar el modelo en caso no considere los cambios
// if (models.Category) {
//   delete models.Category;
// }

const categoriaSchema = new Schema(
  {
    nombre: {
      type: String,
      unique: true,
      required: [true, 'nombre is required'],
    },
    descripcion: {
      type: String,
      required: [true, 'Descripcion is required'],
    },
    estado: {
      type: String,
      required: [true, 'Estado is required'],
    },
    segmentoId: {
      type: Schema.Types.ObjectId,
      ref: 'Segment',
      required: [true, 'Segmento is required'],
    },
  },
  {
    timestamps: true,
  }
);

export const Categoria =
  models?.Categoria || model('Categoria', categoriaSchema);
