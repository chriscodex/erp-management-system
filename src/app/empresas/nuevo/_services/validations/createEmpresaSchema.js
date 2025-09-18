import { z } from 'zod';

export const createEmpresaSchema = z.object({
  ruc: z
    .string({
      required_error: 'El RUC es requerido',
    })
    .length(11, 'El RUC debe tener 11 dígitos'),
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
    .max(250, {
      message: 'La descripción no puede tener más de 250 caracteres',
    })
    .optional(),
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
  departamento: z
    .string({
      required_error: 'El departamento es requerido',
    })
    .min(2, { message: 'El departamento debe tener al menos 2 caracteres' }),
  distrito: z
    .string({
      required_error: 'El distrito es requerido',
    })
    .min(2, { message: 'El distrito debe tener al menos 2 caracteres' }),
  provincia: z
    .string({
      required_error: 'La provincia es requerida',
    })
    .min(2, { message: 'La provincia debe tener al menos 2 caracteres' }),
  ubigeo: z
    .string({
      required_error: 'El ubigeo es requerido',
    })
    .length(6, { message: 'El ubigeo debe tener 6 dígitos' }),
  telefono: z
    .string({
      required_error: 'El teléfono es requerido',
    })
    .optional(),
  email: z.string().optional(),
});
