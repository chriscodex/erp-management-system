import { z } from 'zod';

export const updatePasswordSchema = z
  .object({
    password: z.string().min(3, {
      message: 'La contraseña debe tener al menos 3 caracteres',
    }),
    confirmPassword: z.string().min(3, {
      message: 'Confirmar contraseña debe tener al menos 3 caracteres',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });
