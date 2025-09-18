import { Schema, model, models } from 'mongoose';

const segmentSchema = new Schema({
  nombre: {
    type: String,
    unique: true,
    required: [true, 'Nombre del segmento es requerido'],
  },
});

export const Segment = models?.Segment || model('Segment', segmentSchema);
