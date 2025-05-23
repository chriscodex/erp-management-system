import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;

export const createOrdenServicioSchema = z.object({

  code: z.union([z.string(), z.number()]),
  cliente: z.object({
    id: z
      .string()
      .regex(objectIdRegex, {
        message: 'Debe ingresar un cliente',
      }),
    tipo: z.enum(['persona', 'empresa']),
    datos: z.object({
      dni: z
        .string()
        .length(8, 'El DNI debe tener 8 dígitos'),
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
      direccion: z
        .string()
        .min(3, {
          message: 'La dirección debe tener al menos 3 caracteres',
        }).optional(),
      email: z
        .string()
        .email({ message: 'Ingrese un correo válido' })
        .optional(),
      celular: z
        .string()
        .min(4, { message: 'El celular debe tener al menos 4 dígitos' })
        .optional(),
    }),
  }),
  moto: z.object({
    vin: z
      .string()
      .length(17, {
        message: 'El VIN debe tener 17 dígitos',
      })
      .optional(),
    placa: z
      .string()
      .optional(),
    nombre: z
      .string()
      .min(3, "El nombre de la moto debe tener al menos 3 caracteres")
      .max(100, "Máximo 100 caracteres")
      .optional(),
    descripcion: z
      .string()
      .min(3, "La descripción debe tener al menos 3 caracteres")
      .max(250, "Máximo 250 caracteres")
      .optional(),
    categoria: z
      .string()
      .min(3, "El nombre de la marca debe tener al menos 3 caracteres")
      .max(20, "Máximo 20 caracteres")
      .optional(),
    marca: z
      .string()
      .min(3, "El nombre de la marca debe tener al menos 3 caracteres")
      .max(20, "Máximo 20 caracteres").optional(),
  }),
  mecanicos: z.array(
    z.object({
      id: z
        .string()
        .regex(objectIdRegex, {
          message: 'Debe ingresar un mecánico',
        }),
      dni: z.string()
        .length(8, 'El DNI debe tener 8 dígitos'),
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
    })
  ).min(1, "Debe asignar al menos un mecánico"),
  fechaIngreso: z
    .union([z.date(), z.string()])
    .transform((val) => (typeof val === "string" ? new Date(val) : val)),
  origenServicio: z.enum(['garantia', 'pagado', 'interno'], {
    required_error: 'Seleccione un origen de servicio',
  }),
  tipoServicio: z.enum(['mantenimiento', 'reparacion'], {
    required_error: 'Seleccione un tipo de servicio',
  }),
  pago: z.object({
    montoAdelanto: z.number({
      required_error: "Ingrese el monto adelantado",
      invalid_type_error: "Debe ingresar un número válido",
    })
  }),
  comentarios: z.string().optional(),
});

