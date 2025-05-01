import { Schema } from 'mongoose';

// Modelo para tipo "persona"
export const personaClienteSchema = new Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  dni: { type: String, required: true },
});