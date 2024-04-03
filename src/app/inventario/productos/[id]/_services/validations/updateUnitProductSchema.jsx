import { z } from 'zod';

const estados = ['disponible', 'dañado', 'reparado', 'desaparecido'];

export const updateUnitProductSchema = z.object({
  estado: z.enum(estados, {
    errorMap: () => ({ message: 'Seleccione un estado' }),
  }),
});
