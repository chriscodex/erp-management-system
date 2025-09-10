import { z } from 'zod';

export const servicioSchema = z.object({
  descripcion: z
    .string({ required_error: 'Ingrese la descripción' })
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  precio: z
    .union([
      z.number({
        required_error: 'Ingrese el precio',
        invalid_type_error: 'Debe ingresar un número válido',
      }),
      z.string().refine((val) => /^[0-9]*\.?[0-9]+$/.test(val), {
        message: 'Ingrese un número válido para el precio',
      }),
    ])
    .transform((val) => (typeof val === 'string' ? Number(val) : val))
    .refine((val) => val >= 0, {
      message: 'El precio debe ser un número mayor o igual a 0',
    }),
  fecha: z
    .union([z.date(), z.string()])
    .transform((val) => (typeof val === 'string' ? new Date(val) : val))
    .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
      message: 'Debe ingresar una fecha válida',
    }),
});
