import { Schema, model, models } from 'mongoose';

// Eliminar el modelo en caso no considere los cambios
// if (models.RegistroDni) {
//   delete models.RegistroDni;
// }

const registroDniSchema = new Schema({
  dni: {
    type: String,
    unique: true,
    required: [true, 'DNI is required'],
  },
  apellidos: {
    type: String,
    required: [true, 'Apellidos is required'],
  },
  nombres: {
    type: String,
    required: [true, 'Nombres is required'],
  },
});

const RegistroDni =
  models?.RegistroDni || model('RegistroDni', registroDniSchema);

export { RegistroDni };
