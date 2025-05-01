import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;

export const createPreventaSchema = z.object({
  clienteId: z.string().regex(objectIdRegex, {
      message: "Es necesario ingresar el cliente",
    }),
  // cliente: z.object({
  //   tipo: z.enum(['persona', 'empresa']),
  //   datos: z.object({}).optional(), // Si quieres que sea un objeto vacío opcional
  // }),
  // fecha: z.date(),
});
