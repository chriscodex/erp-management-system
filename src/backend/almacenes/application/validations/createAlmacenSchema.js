import { z } from 'zod';

export const createAlmacenSchema = z.object({
  nombre: z
    .string()
    .min(1, {
      message: 'El nombre debe tener al menos 1 caracter',
    })
    .max(50, {
      message: 'El nombre debe tener menos de 50 caracteres',
    }),
  descripcion: z
    .string()
    .min(1, {
      message: 'La descripción debe tener al menos 1 caracter',
    })
    .max(50, {
      message: 'La descripción debe tener menos de 50 caracteres',
    })
    .optional(),
  ubicacion: z
    .string()
    .min(1, {
      message: 'La dirección debe tener al menos 1 caracter',
    })
    .max(50, {
      message: 'La dirección debe tener menos de 50 caracteres',
    }),
});
