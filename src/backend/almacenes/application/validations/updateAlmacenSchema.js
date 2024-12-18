import { z } from 'zod';

const estados = ['activo', 'inactivo'];

export const updateAlmacenSchema = z.object({
  nombre: z
    .string()
    .min(1, {
      message: 'El nombre debe tener al menos 1 caracter',
    })
    .max(50, {
      message: 'El nombre debe tener menos de 50 caracteres',
    })
    .optional(),
  descripcion: z
    .string()
    .min(1, {
      message: 'La descripción debe tener al menos 1 caracter',
    })
    .max(50, {
      message: 'La descripción debe tener menos de 50 caracteres',
    })
    .optional(),
  ubicacion: z
    .string()
    .min(1, {
      message: 'La dirección debe tener al menos 1 caracter',
    })
    .max(50, {
      message: 'La dirección debe tener menos de 50 caracteres',
    })
    .optional(),
  estado: z
    .enum(estados, {
      errorMap: () => ({ message: 'Seleccione un estado' }),
    })
    .optional(),
});
