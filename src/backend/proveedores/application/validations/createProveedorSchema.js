import { z } from 'zod';

export const createProveedorSchema = z.object({
  nombre: z
    .string()
    .min(1, {
      message: 'El nombre debe tener al menos 1 caracter',
    })
    .max(50, {
      message: 'El nombre debe tener menos de 50 caracteres',
    }),
  ruc: z.string().optional(),
  direccion: z.string().optional(),
  celular: z.string().optional(),
});
