import { z } from 'zod';

export const createEmpresaSchema = z.object({
  ruc: z.string({
    required_error: 'El RUC es requerido',
  }).length(11, 'El RUC debe tener 11 dígitos'),
  nombre: z
    .string()
    .min(3, {
      message: 'El nombre deben tener al menos 3 caracteres',
    })
    .max(150, {
      message: 'El nombre no puede tener más de 150 caracteres',
    }),
  descripcion: z
    .string()
    .min(3, {
      message: 'La descripción debe tener al menos 3 caracteres',
    })
    .max(250, {
      message: 'La descripción no puede tener más de 250 caracteres',
    }),
  direccion: z
    .string({
      required_error: 'La dirección es requerida',
    })
    .min(3, {
      message: 'La dirección debe tener al menos 3 caracteres',
    })
    .max(150, {
      message: 'La dirección no puede tener más de 150 caracteres',
    }),
  telefono: z
    .string({
      required_error: 'El teléfono es requerido',
    })
    .min(4, { message: 'El teléfono debe tener al menos 4 dígitos' }),
  email: z.string({
    required_error: 'El correo electrónico es requerido',
  }).email({ message: 'Ingrese un correo válido' }),
});