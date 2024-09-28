import { z } from 'zod';

const roles = ['Administrador', 'Vendedor', 'Tecnico'];

export const newUserSchema = z.object({
  dni: z
    .string()
    .length(8, 'El DNI debe tener 8 dígitos'),
  apellidos: z
    .string()
    .min(3, {
      message: 'Los apellidos deben tener al menos 3 caracteres',
    })
    .max(50, {
      message: 'Los apellidos no puede tener más de 50 caracteres',
    }),
  nombres: z
    .string()
    .min(3, {
      message: 'Los nombres deben tener al menos 3 caracteres',
    })
    .max(50, {
      message: 'Los nombres no puede tener más de 50 caracteres',
    }),
  celular: z
    .string()
    .min(4, { message: 'El celular debe tener al menos 4 dígitos' }),
  direccion: z.string().min(3, {
    message: 'La dirección debe tener al menos 3 caracteres',
  }),
  rol: z.enum(roles, {
    errorMap: () => ({ message: 'Seleccione un rol' }),
  }),
  password: z.string().min(3, {
    message: 'La contraseña debe tener al menos 3 caracteres',
  }),
  confirmPassword: z.string().min(3, {
    message: 'Confirmar contraseña debe tener al menos 3 caracteres',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});
