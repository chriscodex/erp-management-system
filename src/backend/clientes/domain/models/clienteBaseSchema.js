import mongoose, { Schema } from 'mongoose';
import { personaClienteSchema } from './personaClienteSchema';
import { empresaClienteSchema } from './empresaClienteSchema';

const clienteBaseSchema = new Schema(
  {
    tipo: {
      type: String,
      required: true,
      enum: ['persona', 'empresa'], // Define los tipos permitidos
    },
    celular: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Aplicar discriminadores
export const Cliente = mongoose.model('Cliente', clienteBaseSchema);
export const PersonaCliente = Cliente.discriminator(
  'Persona',
  personaClienteSchema
);
export const EmpresaCliente = Cliente.discriminator(
  'Empresa',
  empresaClienteSchema
);
