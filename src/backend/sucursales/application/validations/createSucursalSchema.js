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
  direccion: z.string().optional(),
  telefono: z.string().optional(),
  email: z.string().email({ message: 'Ingrese un correo válido' }).optional(),
});
