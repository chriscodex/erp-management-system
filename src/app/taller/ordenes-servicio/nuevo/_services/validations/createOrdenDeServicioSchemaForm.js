import { z } from 'zod';
const objectIdRegex = /^[a-f\d]{24}$/i;
export const createOrdenDeServicioSchema = z
  .object({
    //Cliente
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
    //Moto
    nombre: z.string().optional(),
    placa: z.string().optional(),
    vin: z
      .string()
      .optional()
      .refine((val) => !val || val.length === 17, {
        message: 'El VIN debe tener exactamente 17 caracteres.',
      }),
    descripcion: z.string().optional(),
    categoria: z.string().optional(),
    marca: z.string().optional(),
    //Mecanico
    mecanicos: z
      .array(
        z.object({
          _id: z.string().regex(objectIdRegex, {
            message: 'Debe ingresar un mecánico',
          }),
          dni: z.string().length(8, 'El DNI debe tener 8 dígitos'),
          nombres: z
            .string()
            .min(3, {
              message: 'Los nombres deben tener al menos 3 caracteres',
            })
            .max(50, {
              message: 'Los nombres no puede tener más de 50 caracteres',
            }),
          apellidos: z
            .string()
            .min(3, {
              message: 'Los apellidos deben tener al menos 3 caracteres',
            })
            .max(50, {
              message: 'Los apellidos no puede tener más de 50 caracteres',
            }),
        }),
      )
      .min(1, 'Debe asignar al menos un mecánico'),
    //Orden de servicio
    montoAdelanto: z
      .union([
        z.number({
          required_error: 'Ingrese el monto adelantado',
          invalid_type_error: 'Debe ingresar un número válido',
        }),
        z.string().refine((val) => /^[0-9]*\.?[0-9]+$/.test(val), {
          message: 'Ingrese un número válido para el monto adelantado',
        }),
      ])
      .transform((val) => (typeof val === 'string' ? Number(val) : val))
      .refine((val) => val >= 0, {
        message: 'El monto adelantado debe ser un número mayor o igual a 0',
      }),
    origenServicio: z.enum(['garantia', 'pagado', 'interno'], {
      message: 'Seleccione un origen de servicio',
    }),
    tipoServicio: z.enum(['mantenimiento', 'reparacion'], {
      message: 'Seleccione un tipo de servicio',
    }),
    comentarios: z.string().optional(),
    fechaIngreso: z
      .union([z.date(), z.string()])
      .transform((val) => (typeof val === 'string' ? new Date(val) : val)),
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
      if (!data.direccion?.trim()) {
        ctx.addIssue({
          path: ['direccion'],
          code: z.ZodIssueCode.custom,
          message: 'El campo direccion es requerido para empresas.',
        });
      }
    }
  });
