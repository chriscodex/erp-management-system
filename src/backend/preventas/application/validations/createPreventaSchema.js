import { z } from 'zod';

export const createPreventaSchema = z.object({
  cliente: z.object({
    tipo: z.enum(['persona', 'empresa']),
    datos: z.object({}).optional(), // Si quieres que sea un objeto vacío opcional
  }),
  // fecha: z.date(),
});
