import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;

export const updateOrdenServicioSchema = z.object({
  cliente: z.object({
    
  }),
});
