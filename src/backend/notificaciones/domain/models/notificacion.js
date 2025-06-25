import { Schema, model, models } from 'mongoose';

const notificacionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es requerido en el schema de notificaciones'],
    },
    message: {
      type: String,
      required: [true, 'El mensaje es requerido en el schema de notificaciones'],
    },
    type: {
      type: String,
      required: false,
    },
    fecha: {
      type: Date,
      required: [true, 'La fecha es requerida en el schema de notificaciones'],
    },
    closed: {
      type: Boolean,
      required: [
        true,
        'El flag close es requerido en el schema de notificaciones',
      ],
    },
    fechaClosed: {
      type: Date,
      required: [
        false,
        'La fecha del flag close es requerida en el schema de notificaciones',
      ],
    },
    fechaReopening: {
      type: Date,
      required: [
        false,
        'La fecha de apertura es requerida en el schema de notificaciones',
      ],
    },
    data: {
      type: Object,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Notificacion = models?.Notificacion || model('Notificacion', notificacionSchema);
