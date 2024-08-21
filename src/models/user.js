import { Schema } from 'mongoose';

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
