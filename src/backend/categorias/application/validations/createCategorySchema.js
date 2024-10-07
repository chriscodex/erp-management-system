import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i; // Expresión regular para el formato de ObjectId

export const createCategorySchema = z.object({
  segmentId: z.string().regex(objectIdRegex, {
    message: 'El id debe ser un ObjectId válido',
  }),
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
    .min(3, {
      message: 'La descripción debe tener al menos 3 caracteres',
    })
    .max(50, {
      message: 'La descripción debe tener más de 50 caracteres',
    })
    .optional(),
});
