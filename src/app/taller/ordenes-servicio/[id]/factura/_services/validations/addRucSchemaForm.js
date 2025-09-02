import { z } from 'zod';
export const addRucSchemaForm = z.object({
  ruc: z
    .string({
      required_error: 'El RUC es requerido',
    })
    .length(11, 'El RUC debe tener 11 dígitos'),
});
