import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;

export const createOrdenServicioSchema = z.object({

  // code: z.string().length(13, { message: 'El código debe ser de 13 dígitos' }),
  // cliente: z.object({
  //   id: z.string().regex(objectIdRegex, {
  //     message: 'Debe ingresar un cliente',
  //   }),
  //   tipo: z.enum(['persona', 'empresa']),
  //   datos: z.object({
  //     dni: z.string().length(8, 'El DNI debe tener 8 dígitos'),
  //     nombres: z
  //       .string()
  //       .min(3, {
  //         message: 'Los nombres deben tener al menos 3 caracteres',
  //       })
  //       .max(50, {
  //         message: 'Los nombres no puede tener más de 50 caracteres',
  //       }),
  //     apellidos: z
  //       .string()
  //       .min(3, {
  //         message: 'Los apellidos deben tener al menos 3 caracteres',
  //       })
  //       .max(50, {
  //         message: 'Los apellidos no puede tener más de 50 caracteres',
  //       }),
  //     direccion: z.string().min(3, {
  //       message: 'La dirección debe tener al menos 3 caracteres',
  //     }),
  //     email: z.string().email({ message: 'Ingrese un correo válido' }),
  //     celular: z
  //       .string()
  //       .min(4, { message: 'El celular debe tener al menos 4 dígitos' }),
  //   }),
  // })

});

