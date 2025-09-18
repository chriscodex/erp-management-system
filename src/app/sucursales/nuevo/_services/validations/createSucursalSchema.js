import { z } from 'zod';

export const createSucursalSchema = z.object({
  nombre: z
    .string()
    .min(3, {
      message: 'El nombre deben tener al menos 3 caracteres',
    })
    .max(150, {
      message: 'El nombre no puede tener más de 150 caracteres',
    }),
  descripcion: z.string().optional(),
  direccion: z
    .string({
      required_error: 'La dirección es requerida',
    })
    .max(150, {
      message: 'La dirección no puede tener más de 150 caracteres',
    })
    .optional(),
  telefono: z
    .string({
      required_error: 'El teléfono es requerido',
    })
    .optional(),
  email: z
    .string({
      required_error: 'El correo electrónico es requerido',
    })
    .email({ message: 'Ingrese un correo válido' })
    .optional(),
});
