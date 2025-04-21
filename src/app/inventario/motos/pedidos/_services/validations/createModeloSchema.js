import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;

export const createModeloSchema = z.object({
  nombre: z
    .string()
    .min(1, {
      message: 'El nombre debe tener al menos 1 caracter',
    })
    .max(50, {
      message: 'El nombre debe tener menos de 50 caracteres',
    }),
  descripcion: z.string().optional(),
  stockMinimo: z
    .union([
      z.number({
        required_error: 'Stock minimo es requerido',
        invalid_type_error: 'Debe ingresar un número válido',
      }),
      z.string().refine((val) => /^[0-9]+$/.test(val), {
        message: 'Ingrese el valor del stock minimo',
      }),
    ])
    .transform((val) => (typeof val === 'string' ? Number(val) : val)) 
    .refine((val) => Number.isInteger(val) && val >= 0, {
      message: 'El stock debe ser un número mayor o igual a 0',
    }),
  marcaId: z.string().regex(objectIdRegex, {
    message: 'Debe elegir una marca',
  }),
  categoryId: z.string().regex(objectIdRegex, {
    message: 'Debe elegir una categoría',
  }),
});