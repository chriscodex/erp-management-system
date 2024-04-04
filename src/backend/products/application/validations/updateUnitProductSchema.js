import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i; // Expresión regular para el formato de ObjectId
const estados = ['disponible', 'reparado', 'dañado', 'desaparecido'];

export const updateUnitProductSchema = z.object({
  unitProductId: z.string().regex(objectIdRegex, {
    message: 'Es obligatorio ingresar el id del unitProduct',
  }),
  code: z
    .string()
    .length(12, { message: 'El codigo debe ser de 12 dígitos' })
    .optional(),
  estado: z
    .enum(estados, {
      errorMap: () => ({ message: 'Seleccione un estado' }),
    })
    .optional(),
});
