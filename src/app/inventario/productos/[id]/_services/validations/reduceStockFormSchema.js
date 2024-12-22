import { z } from 'zod';

export const reduceStockFormSchema = z.object({
  cantidad: z
    .string({
      required_error: 'Ingrese la cantidad',
    })
    .transform((val) => {
      const numberValue = Number(val);
      if (isNaN(numberValue)) {
        throw new Error('La cantidad debe ser un número válido');
      }
      return numberValue;
    }),
});
