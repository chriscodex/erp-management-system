import mongoose, { models, Schema } from 'mongoose';
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
    discriminatorKey: 'tipo', // Usa la clave "tipo" para diferenciar
    collection: 'clientes', // Nombre de la colección en la base de datos
    timestamps: true,
  }
);

// Aplicar discriminadores
export const Cliente =
  models?.Cliente || mongoose.model('Cliente', clienteBaseSchema);
export const PersonaCliente =
  models.Persona || Cliente.discriminator('Persona', personaClienteSchema);
export const EmpresaCliente =
  models.Empresa || Cliente.discriminator('Empresa', empresaClienteSchema);
