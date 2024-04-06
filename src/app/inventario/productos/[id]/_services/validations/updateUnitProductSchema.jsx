import { z } from 'zod';

const estados = ['disponible', 'dañado', 'reparado', 'desaparecido'];

export const updateUnitProductFormSchema = z.object({
  estado: z.enum(estados, {
    errorMap: () => ({ message: 'Seleccione un estado' }),
  }),
});
