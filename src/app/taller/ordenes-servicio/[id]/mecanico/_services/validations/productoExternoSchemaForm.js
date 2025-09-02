import { z } from 'zod';

export const productoExternoSchema = z.object({
  nombre: z
    .string({ required_error: 'Ingrese el nombre del producto externo' })
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  descripcion: z
    .string({ required_error: 'Ingrese la descripción' })
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  cantidad: z
    .union([
      z.number({
        required_error: 'Ingrese la cantidad',
        invalid_type_error: 'Debe ingresar un número valido',
      }),
      z.string().refine((val) => /^[0-9]*\.?[0-9]+$/.test(val), {
        message: 'Ingrese un número valido para la cantidad',
      }),
    ])
    .transform((val) => (typeof val === 'string' ? Number(val) : val))
    .refine((val) => val >= 0, {
      message: 'La cantidad debe ser un número mayor o igual a 0',
    }),
  fecha: z
    .union([z.date(), z.string()])
    .transform((val) => (typeof val === 'string' ? new Date(val) : val))
    .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
      message: 'Debe ingresar una fecha válida',
    }),
});
