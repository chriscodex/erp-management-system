import { Schema } from 'mongoose';

// Modelo para tipo "persona"
export const personaClienteSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, required: true },
});