import { Schema, model, models } from 'mongoose';

// Eliminar el modelo en caso no considere los cambios
// if (models.Marca) {
//   delete models.Marca;
// }

const marcaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'nombre es requerido en el schema de marcas'],
    },
    descripcion: {
      type: String,
      required: false,
    },
    estado: {
      type: String,
      required: [true, 'Estado es requerido en el schema de marcas'],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'categoryId es requerido en el schema de marcas'],
    },
  },
  {
    timestamps: true,
  }
);

export const Marca = models?.Marca || model('Marca', marcaSchema);
