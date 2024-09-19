import { Schema, model, models } from 'mongoose';

// Eliminar el modelo en caso no considere los cambios
// if (models.User) {
//   delete models.User;
// }

const userSchema = new Schema(
  {
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
    celular: {
      type: String,
      required: [true, 'Celular is required'],
    },
    direccion: {
      type: String,
      required: [true, 'Dirección is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    rol: {
      type: String,
      required: [true, 'Rol is required'],
    },
  },
  {
    timestamps: true,
  }
);

const User = models?.User || model('User', userSchema);

export { User };
