import { z } from 'zod';

const estados = ['activo', 'inactivo'];

export const updateAlmacenSchema = z.object({
  nombre: z.string().min(1, { message: 'El nombre es requerido' }).optional(),
  descripcion: z.string().optional(),
  ubicacion: z.string().optional(),
  estado: z
    .enum(estados, {
      errorMap: () => ({ message: 'Seleccione un estado' }),
    })
    .optional(),
});
