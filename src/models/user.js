import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  dni: {
    type: String,
    unique: true,
    required: [true, 'DNI is required'],
  },
  password: {
    type: String,
    required: [true, 'DNI is required'],
    select: false,
  },
});

const User = models.User || model('User', userSchema);

export default User