import { z } from 'zod';

export const updateCategorySchema = z.object({
  nombre: z.string().optional(),
  descripcion: z.string().optional(),
  segmentId: z
    .string()
    .optional(),
});
