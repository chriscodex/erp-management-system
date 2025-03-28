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
  fechaIngreso: z
    .union([z.date(), z.string()]) // Acepta tanto Date como string
    .transform((val) => (typeof val === "string" ? new Date(val) : val)) // Convierte string a Date
    .refine((date) => {
      const inputDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const today = new Date();
      const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      return inputDate <= todayDate;
    }, { message: "La fecha debe ser anterior o igual a la fecha actual" }),
 }).refine((data) => data.password === data.confirmPassword, {
   message: 'Las contraseñas no coinciden',
   path: ['confirmPassword'],
});
