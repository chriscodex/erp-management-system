import { Schema, model, models } from 'mongoose';

// Eliminar el modelo en caso no considere los cambios
if (models.Segment) {
  delete models.Segment;
}

const segmentSchema = new Schema({
  nombre: {
    type: String,
    unique: true,
    required: [true, 'Nombre del segmento es requerido'],
  },
});

export const Segment = models?.Segment || model('Segment', segmentSchema);
