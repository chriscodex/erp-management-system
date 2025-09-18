import { z } from 'zod';

export const updateEmpresaSchema = z.object({
  ruc: z.string().length(11, 'El RUC debe tener 11 dígitos').optional(),
  nombre: z
    .string()
    .min(3, {
      message: 'El nombre deben tener al menos 3 caracteres',
    })
    .max(150, {
      message: 'El nombre no puede tener más de 150 caracteres',
    })
    .optional(),
  descripcion: z
    .string()
    .min(3, {
      message: 'La descripción debe tener al menos 3 caracteres',
    })
    .max(250, {
      message: 'La descripción no puede tener más de 250 caracteres',
    })
    .optional(),
  direccion: z
    .string()
    .min(3, {
      message: 'La dirección debe tener al menos 3 caracteres',
    })
    .max(150, {
      message: 'La dirección no puede tener más de 150 caracteres',
    })
    .optional(),
  telefono: z
    .string()
    .min(4, { message: 'El teléfono debe tener al menos 4 dígitos' })
    .optional(),
  email: z.string().email({ message: 'Ingrese un correo válido' }).optional(),
});
