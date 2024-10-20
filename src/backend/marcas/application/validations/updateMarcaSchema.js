import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i; // Expresión regular para el formato de ObjectId
const estados = ['activo', 'inactivo'];

export const updateCategorySchema = z.object({
  nombre: z.string().optional(),
  descripcion: z.string().optional(),
  estado: z
    .enum(estados, {
      errorMap: () => ({ message: 'Seleccione un estado' }),
    })
    .optional(),
  segmentId: z
    .string()
    .regex(objectIdRegex, {
      message: 'El id debe ser un ObjectId válido',
    })
    .optional(),
});
