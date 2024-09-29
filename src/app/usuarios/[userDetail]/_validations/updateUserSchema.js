import { z } from 'zod';

const roles = ['Administrador', 'Vendedor', 'Tecnico'];
const estados = ['activo', 'inactivo'];

export const updateUserSchema = z.object({
  dni: z.string().length(8, 'El DNI debe tener 8 dígitos'),
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
  estado: z.enum(estados, {
    errorMap: () => ({ message: 'Seleccione un estado' }),
  }),
});
