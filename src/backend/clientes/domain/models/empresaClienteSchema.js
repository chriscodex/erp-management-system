import { Schema } from 'mongoose';

// Modelo para tipo "empresa"
export const empresaClienteSchema = new Schema({
  razonSocial: { type: String, required: true }, // Nombre de la empresa
  ruc: { type: String, required: true },
});
