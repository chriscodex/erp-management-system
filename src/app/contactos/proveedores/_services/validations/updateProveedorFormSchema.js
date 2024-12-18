import { z } from 'zod';

export const updateProveedorFormSchema = z.object({
  nombre: z
    .string()
    .min(1, {
      message: 'El nombre debe tener al menos 1 caracter',
    })
    .max(50, {
      message: 'El nombre debe tener menos de 50 caracteres',
    })
    .optional(),
  ruc: z
    .string()
    .length(11, { message: 'El RUC debe tener 11 dígitos' })
    .optional(),
  direccion: z
    .string()
    .min(1, {
      message: 'La dirección debe tener al menos 1 caracter',
    })
    .max(50, {
      message: 'La dirección debe tener menos de 50 caracteres',
    })
    .optional(),
  celular: z
    .string()
    .min(1, {
      message: 'El celular debe tener al menos 1 caracter',
    })
    .optional(),
});
