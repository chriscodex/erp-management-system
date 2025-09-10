import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;

export const createPedidoSchema = z.object({
  modelo: z.object({
    nombre: z
      .string()
      .min(1, {
        message: 'El nombre debe tener al menos 1 caracter',
      })
      .max(50, {
        message: 'El nombre debe tener menos de 50 caracteres',
      }),
    descripcion: z.string().optional(),
    stockMinimo: z
      .number({
        required_error: 'El stock mínimo es requerido',
        invalid_type_error: 'El stock mínimo debe ser un número',
      })
      .int('El stock mínimo debe ser un número entero')
      .nonnegative('El sotck mínimo debe ser mayor o igual a 0'),
    marcaId: z.string().regex(objectIdRegex, {
      message: 'Debe elegir una marca',
    }),
    categoryId: z.string().regex(objectIdRegex, {
      message: 'Debe elegir una categoría',
    }),
  }),
  moto: z.object({
    nombre: z
      .string()
      .min(1, {
        message: 'El nombre debe tener al menos 1 caracter',
      })
      .max(50, {
        message: 'El nombre debe tener menos de 50 caracteres',
      }),
    descripcion: z.string().optional(),
    caracteristicas: z
      .object({
        motor: z.string().optional(),
        cilindrada: z.string().optional(),
        potencia: z.string().optional(),
        frenos: z.string().optional(),
        transmision: z.string().optional(),
        dimensiones: z.string().optional(),
        capacidadCombustible: z.string().optional(),
        suspension: z.string().optional(),
        colores: z.string().optional(),
      })
      .nullable()
      .optional(),
    cantidad: z
      .number()
      .nonnegative('La cantidad debe ser un número mayor o igual a 0'),
    importado: z.enum(['si', 'no']),
  }),
  estadoPago: z.enum(['pendiente', 'parcial', 'completado']),
  montoPagado: z
    .number()
    .nonnegative('El monto pagado debe ser un número mayor o igual a 0')
    .optional(),
  montoTotal: z
    .number()
    .nonnegative('El monto total debe ser un número mayor o igual a 0'),
  fechaPago: z.preprocess(
    (val) => {
      if (typeof val === 'string' || val instanceof Date) {
        return new Date(val);
      }
      return val;
    },
    z.date().refine((date) => !isNaN(date.getTime()), {
      message: 'La fecha no es válida',
    }),
  ),
  comentario: z.string().optional(),
  proveedorId: z.string().regex(objectIdRegex, {
    message: 'Debe elegir un proveedor',
  }),
  almacenId: z.string().regex(objectIdRegex, {
    message: 'Debe elegir un almacen',
  }),
  fechaLimite: z.preprocess(
    (val) => {
      if (typeof val === 'string' || val instanceof Date) {
        return new Date(val);
      }
      return val;
    },
    z.date().refine((date) => !isNaN(date.getTime()), {
      message: 'La fecha no es válida',
    }),
  ),
});
