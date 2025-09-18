import { Schema, model, models } from 'mongoose';

const reservacionSchema = new Schema(
  {
    pagoInicial: {
      type: Number,
      required: [
        true,
        'El pago inicial es requerido en el schema de reservaciones',
      ],
    },
    fechaLimite: {
      type: Date,
      required: [true, 'Fecha is required'],
    },
    comentario: {
      type: String,
      required: [false],
    },
    moto: {
      nombre: {
        type: String,
        required: [
          true,
          'El nombre de la moto es requerido en el schema de reservaciones',
        ],
      },
      descripcion: {
        type: String,
        required: [
          true,
          'La descripcion de la moto es requerida en el schema de reservaciones',
        ],
      },
      categoria: {
        nombre: {
          type: String,
          required: [
            true,
            'El nombre de la categoria es requerido en el schema de reservaciones',
          ],
        },
      },
      marca: {
        nombre: {
          type: String,
          required: [
            true,
            'El nombre de la marca es requerido en el schema de reservaciones',
          ],
        },
      },
    },
    cliente: {
      tipo: {
        type: String,
        required: [true, 'El tipo es requerido en el schema de reservaciones'],
        enum: ['persona', 'empresa'],
      },
      datos: {
        type: Schema.Types.Mixed,
        required: [
          true,
          'Los datos del cliente son requeridos en el schema de reservaciones',
        ],
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Reservacion =
  models?.Reservacion || model('Reservacion', reservacionSchema);
