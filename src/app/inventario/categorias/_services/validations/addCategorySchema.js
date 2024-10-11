import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i; // Expresión regular para el formato de ObjectId

export const addCategorySchema = z.object({
  nombre: z
    .string()
    .min(1, {
      message: 'El nombre debe tener al menos 1 caracter',
    })
    .max(50, {
      message: 'El nombre debe tener más de 50 caracteres',
    }),
  descripcion: z
    .string()
    .optional(),
  segmentId: z.string().regex(objectIdRegex, {
    message: 'Debe elegir un segmento',
  }),
});
