import { z } from 'zod';

const estados = ['activo', 'inactivo'];

export const updateMarcaSchema = z.object({
  nombre: z.string().min(1, { message: 'El nombre es requerido' }),
  descripcion: z.string().optional(),
  estado: z.enum(estados, {
    errorMap: () => ({ message: 'Seleccione un estado' }),
  }),
  segmentId: z.string(),
});
