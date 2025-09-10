import { z } from 'zod';

export const productoSchema = z.object({
  precioVenta: z
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
});
