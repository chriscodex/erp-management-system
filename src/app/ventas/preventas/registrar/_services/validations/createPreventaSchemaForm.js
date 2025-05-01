import { z } from 'zod';

export const createPreventaSchemaForm = z.object({
  identificador: z.string().min(8, {
    message: 'El identificador debe tener al menos 8 caracteres',
  }),
  tipo: z.enum(['persona', 'empresa']),
  nombres: z.string().optional(),
  apellidos: z.string().optional(),
  razonSocial: z.string().optional(),
  representanteLegal: z.string().optional(),
  direccion: z.string().optional(),
  email: z.string().optional(),
  celular: z.string().optional(),
  comentarios: z.string().optional(),
  cotizacion: z.enum(['si', 'no']).optional(),
  fechaValidez: z.date().nullable().optional(),
});
