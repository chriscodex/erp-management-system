import { Schema, model, models } from 'mongoose';
// import { motoPreventaSchema } from '@/backend/preventas/domain/models/motoPreventa';
// import { productoPreventaSchema } from '@/backend/preventas/domain/models/productPreventa';

const preventaSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, 'El code es requerido en el schema de preventas'],
    },
    fecha: {
      type: Date,
      required: [true, 'La fecha es requerida en el schema de preventas'],
    },
    clienteId: {
      type: Schema.Types.ObjectId,
      ref: "Cliente",
      required: [true, "El cliente es requerido en el schema de preventas."],
    },
    usuario: {
      id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'El id es requerido en el schema de preventas'],
      },
      dni: {
        type: String,
        required: [true, 'El dni es requerido en el schema de preventas'],
      },
      rol: {
        type: String,
        required: [true, 'El rol es requerido en el schema de preventas'],
      },
      nombres: {
        type: String,
        required: [
          true,
          'Los nombres son requeridos en el schema de preventas',
        ],
      },
      apellidos: {
        type: String,
        required: [
          true,
          'Los apellidos son requeridos en el schema de preventas',
        ],
      },
    },
    comentarios: {
      type: String,
      required: false,
    },
    productos: [
      {
        type: Schema.Types.Mixed,
        required: [
          false,
          'Los productos son requeridos en el schema de preventas',
        ],
      },
    ],
    obsequios: [
      {
        type: Schema.Types.Mixed,
        required: false,
      },
    ],
    cotizacion: {
      type: String,
      required: [true, 'Elegir si es cotización o no es requerido en el schema de preventas'],
      enum: ["si", "no"],
    },
    fechaValidez: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// // Crear el modelo base para productos
// export const ProductoPreventaBase =
//   models?.ProductoPreventaBase ||
//   model('ProductoPreventaBase', productoPreventaBaseSchema);

// // Agregar discriminadores
// export const MotoPreventa =
//   models.MotoPreventa ||
//   ProductoPreventaBase.discriminator('MotoPreventa', motoPreventaSchema);

// export const ProductoPreventa =
//   models.ProductoPreventa ||
//   ProductoPreventaBase.discriminator(
//     'ProductoPreventa',
//     productoPreventaSchema
//   );

export const Preventa = models?.Preventa || model('Preventa', preventaSchema);
