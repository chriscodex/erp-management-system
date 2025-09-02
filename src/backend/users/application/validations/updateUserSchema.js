import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;

const roles = ['Administrador', 'Vendedor', 'Tecnico'];

const estados = ['activo', 'inactivo'];

export const updateUserSchema = z.object({
  dni: z.string().length(8, 'El DNI debe tener 8 dígitos').optional(), // El DNI puede ser opcional
  apellidos: z
    .string()
    .min(3, {
      message: 'Los apellidos deben tener al menos 3 caracteres',
    })
    .max(50, {
      message: 'Los apellidos no pueden tener más de 50 caracteres',
    })
    .optional(), // Los apellidos pueden ser opcionales
  nombres: z
    .string()
    .min(3, {
      message: 'Los nombres deben tener al menos 3 caracteres',
    })
    .max(50, {
      message: 'Los nombres no pueden tener más de 50 caracteres',
    })
    .optional(), // Los nombres pueden ser opcionales
  celular: z
    .string()
    .min(4, { message: 'El celular debe tener al menos 4 dígitos' })
    .optional(), // El celular puede ser opcional
  direccion: z
    .string()
    .min(3, {
      message: 'La dirección debe tener al menos 3 caracteres',
    })
    .optional(), // La dirección puede ser opcional
  rol: z
    .enum(roles, {
      errorMap: () => ({ message: 'Seleccione un rol' }),
    })
    .optional(), // El rol puede ser opcional
  estado: z
    .enum(estados, {
      errorMap: () => ({ message: 'Seleccione un estado' }),
    })
    .optional(), // El rol puede ser opcional
  password: z
    .string()
    .min(3, {
      message: 'La contraseña debe tener al menos 3 caracteres',
    })
    .optional(), // La contraseña puede ser opcional
  fechaIngreso: z
    .union([z.date(), z.string()]) // Acepta tanto Date como string
    .transform((val) => (typeof val === 'string' ? new Date(val) : val)) // Convierte string a Date
    .refine(
      (date) => {
        const inputDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
        );
        const today = new Date();
        const todayDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        );
        return inputDate <= todayDate;
      },
      { message: 'La fecha debe ser anterior o igual a la fecha actual' },
    )
    .optional(),
  sucursalId: z
    .string()
    .regex(objectIdRegex, 'El id de la sucursal no es válido')
    .optional(),
});
