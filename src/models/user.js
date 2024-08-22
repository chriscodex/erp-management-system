import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
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
  dirección: {
    type: String,
    required: [true, 'Dirección is required'],
  },
  password: {
    type: String,
    required: [true, 'DNI is required'],
    select: false,
  },
  
});

const User = models.User || model('User', userSchema);

export default User