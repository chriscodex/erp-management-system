import { Schema, model, models } from 'mongoose';

// Eliminar el modelo en caso no considere los cambios
// if (models.Modelo) {
//   delete models.Modelo;
// }

const modeloSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
      unique: true,
      required: [true, 'El nombre es requerido en el schema de modelos'],
    },
    descripcion: {
      type: String,
      required: false,
    },
    stockMinimo: {
      type: Number,
      required: [
        true,
        'El stock minimo es requerido en el schema de productos',
      ],
      min: [0, 'El stock mínimo no puede ser negativo'],
    },
    estado: {
      type: String,
      required: [true, 'Estado es requerido en el schema de proveedores'],
      enum: ['activo', 'inactivo'],
    },
    marcaId: {
      type: Schema.Types.ObjectId,
      ref: 'Marca',
      required: [true, 'marcaId es requerido en el schema de productos'],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'categoriaId es requerido en el schema de productos'],
    },
  },
  {
    timestamps: true,
  }
);


export const Modelo = models?.Modelo || model('Modelo', modeloSchema);
