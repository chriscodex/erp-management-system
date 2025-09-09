import { Schema, model, models } from 'mongoose';

const productSchema = new Schema(
  {
    estado: {
      type: String,
      required: [true, 'Estado es requerido en el schema de categoría'],
      enum: ['activo', 'inactivo'],
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
          index: true,
        },
        estado: {
          type: String,
          required: [true, 'El estado es requerido en el schema de productos'],
          enum: [
            'disponible',
            'dañado',
            'desaparecido',
            'reparado',
            'prevendido',
            'taller',
          ],
        },
      },
    ],
    gastos: [
      {
        descripcion: {
          type: String,
          required: [
            true,
            'La descripción es requerida en el schema de productos',
          ],
        },
        monto: {
          type: Number,
          required: [true, 'El monto es requerido en el schema de productos'],
        },
        fecha: {
          type: Date,
          required: [true, 'La fecha es requerida en el schema de productos'],
        },
      },
    ],
    precioCompra: {
      type: Number,
      required: [
        true,
        'El precio de compra es requerido en el schema de productos',
      ],
      min: [0, 'El precio de compra no puede ser negativo'],
    },
    precioVenta: {
      type: Number,
      required: [
        true,
        'El precio de venta es requerido en el schema de productos',
      ],
      min: [0, 'El precio de venta no puede ser negativo'],
    },
    obsequio: {
      type: String,
      required: [true, 'El obsequio es requerido en el schema de productos'],
      enum: ['si', 'no'],
    },
    importado: {
      type: String,
      required: [
        true,
        'Indicar si es importado es requerido en el schema de productos',
      ],
      enum: ['si', 'no'],
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
    almacenId: {
      type: Schema.Types.ObjectId,
      ref: 'Almacen',
      required: [true, 'almacenId es requerido en el schema de productos'],
    },
    proveedorId: {
      type: Schema.Types.ObjectId,
      ref: 'Proveedor',
      required: [true, 'proveedorId es requerido en el schema de productos'],
    },
  },
  {
    timestamps: true,
  }
);

// Index para mejorar búsquedas por nombre
productSchema.index({ nombre: 1 });

export const Product = models?.Product || model('Product', productSchema);
