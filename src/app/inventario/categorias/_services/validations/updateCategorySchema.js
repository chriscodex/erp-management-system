import { z } from 'zod';

const estados = ['activo', 'inactivo'];

export const updateCategorySchema = z.object({
  nombre: z.string(),
  descripcion: z.string().optional(),
  estado: z.enum(estados, {
    errorMap: () => ({ message: 'Seleccione un estado' }),
  }),
  segmentId: z.string(),
});
