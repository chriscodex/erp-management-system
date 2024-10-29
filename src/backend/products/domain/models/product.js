import { Schema, model, models } from 'mongoose';

// if (models.Product) {
//   delete models.Product;
// }

const productSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
      required: [true, 'El nombre es requerido en el schema de productos'],
    },
    descripcion: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
      required: [true, 'El stock es requerido en el schema de productos'],
      min: [0, 'El stock no puede ser negativo'],
    },
    stockMinimo: {
      type: Number,
      required: [
        true,
        'El stock minimo es requerido en el schema de productos',
      ],
      min: [0, 'El stock mínimo no puede ser negativo'],
    },
    unidades: [
      {
        code: {
          type: String,
          required: true,
        },
        estado: {
          type: String,
          required: [true, 'El estado es requerido en el schema de productos'],
          enum: ['activo', 'inactivo'],
        },
      },
    ],
  },
  { timestamps: true }
);

// Index para mejorar búsquedas por nombre
productSchema.index({ nombre: 1 });

export const Product = models?.Product || model('Product', productSchema);
