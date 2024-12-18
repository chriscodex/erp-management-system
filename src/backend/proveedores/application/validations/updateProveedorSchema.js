import { z } from 'zod';

export const updateProveedorSchema = z.object({
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
    .min(1, {
      message: 'El RUC debe tener al menos 1 caracter',
    })
    .max(50, {
      message: 'El RUC debe tener menos de 50 caracteres',
    })
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
      message: 'El teléfono debe tener al menos 1 caracter',
    })
    .max(50, {
      message: 'El teléfono debe tener menos de 50 caracteres',
    })
    .optional(),
});
