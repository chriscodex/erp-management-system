import { z } from 'zod';

export const addClienteFormSchema = z
  .object({
    tipo: z.enum(['persona', 'empresa']),
    identificador: z
      .string()
      .min(8, 'El identificador debe de tener al menos 8 caracteres'),
    razonSocial: z.string().optional(),
    representanteLegal: z.string().optional(),

    apellidos: z.string().optional(),
    nombres: z.string().optional(),

    direccion: z.string().optional(),
    email: z.string().optional(),
    celular: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Validación de identificador según tipo
    if (data.tipo === 'persona' && data.identificador.trim().length !== 8) {
      ctx.addIssue({
        path: ['identificador'],
        code: z.ZodIssueCode.custom,
        message: 'El DNI debe tener exactamente 8 dígitos.',
      });
    }

    if (data.tipo === 'empresa' && data.identificador.trim().length !== 11) {
      ctx.addIssue({
        path: ['identificador'],
        code: z.ZodIssueCode.custom,
        message: 'El RUC debe tener exactamente 11 dígitos.',
      });
    }
    // Campos requeridos para persona
    if (data.tipo === 'persona') {
      if (!data.nombres?.trim()) {
        ctx.addIssue({
          path: ['nombres'],
          code: z.ZodIssueCode.custom,
          message: 'El campo nombres es requerido para personas.',
        });
      }
      if (!data.apellidos?.trim()) {
        ctx.addIssue({
          path: ['apellidos'],
          code: z.ZodIssueCode.custom,
          message: 'El campo apellidos es requerido para personas.',
        });
      }
    }
    // Campos requeridos para empresa
    if (data.tipo === 'empresa') {
      if (!data.razonSocial?.trim()) {
        ctx.addIssue({
          path: ['razonSocial'],
          code: z.ZodIssueCode.custom,
          message: 'El campo razón social es requerido para empresas.',
        });
      }
      if (!data.representanteLegal?.trim()) {
        ctx.addIssue({
          path: ['representanteLegal'],
          code: z.ZodIssueCode.custom,
          message: 'El campo representante legal es requerido para empresas.',
        });
      }
    }
  });
