import { z } from 'zod';

export const filtroAvanzadoSchema = z.object({
  codigo: z.string().optional(),
  montoMinimo: z
    .union([
      z.number(),
      z.string().transform((val) => (val.trim() === '' ? undefined : val)),
    ])
    .transform((val) => (typeof val === 'string' ? Number(val) : val))
    .refine((val) => val === undefined || (Number.isInteger(val) && val >= 0), {
      message: 'El monto mínimo debe ser un número mayor o igual a 0',
    })
    .optional(),
  montoMaximo: z
    .union([
      z.number(),
      z.string().transform((val) => (val.trim() === '' ? undefined : val)),
    ])
    .transform((val) => (typeof val === 'string' ? Number(val) : val))
    .refine((val) => val === undefined || (Number.isInteger(val) && val >= 0), {
      message: 'El monto mínimo debe ser un número mayor o igual a 0',
    })
    .optional(),
  fechaDesde: z.date().optional(),
  fechaHasta: z.date().optional(),
  tipo: z.enum(['persona', 'empresa']).optional(),
  identificador: z
    .string()
    .transform((val) => (val.trim() === '' ? undefined : val))
    .refine((val) => !val || val.length >= 8, {
      message: 'El identificador debe tener al menos 8 caracteres',
    })
    .optional(),
});
