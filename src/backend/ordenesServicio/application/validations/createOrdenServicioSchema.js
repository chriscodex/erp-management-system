import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;

export const createOrdenServicioSchema = z.object({
  cliente: z.object({
    
  }),
});

