import { Schema, model, models } from 'mongoose';


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
    segmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Segment',
      required: [true, 'segmentId es requerido en el schema de marcas'],
    },
  },
  {
    timestamps: true,
  }
);

export const Marca = models?.Marca || model('Marca', marcaSchema);
