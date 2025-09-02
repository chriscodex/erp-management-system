import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i; // Expresión regular para el formato de ObjectId

export const createMotoSchema = z.object({
  modeloId: z.string().regex(objectIdRegex, {
    message: 'El modelo es requerido',
  }),
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
    .optional(),
  precioCompra: z
    .union([
      z.number({
        required_error: 'Ingrese el precio de compra',
        invalid_type_error: 'Debe ingresar un número válido',
      }),
      z.string().refine((val) => /^[0-9]*\.?[0-9]+$/.test(val), {
        message: 'Ingrese un número válido para el precio de compra',
      }), // Permite números con decimales
    ])
    .transform((val) => (typeof val === 'string' ? Number(val) : val)) // Convierte cadenas válidas a números
    .refine((val) => val >= 0, {
      message: 'El precio de compra debe ser un número mayor o igual a 0',
    }),
  precioVenta: z
    .union([
      z.number({
        required_error: 'Ingrese el precio de venta',
        invalid_type_error: 'Debe ingresar un número válido',
      }),
      z.string().refine((val) => /^[0-9]*\.?[0-9]+$/.test(val), {
        message: 'Ingrese un número válido para el precio de venta',
      }), // Permite números con decimales
    ])
    .transform((val) => (typeof val === 'string' ? Number(val) : val)) // Convierte cadenas válidas a números
    .refine((val) => val >= 0, {
      message: 'El precio de venta debe ser un número mayor o igual a 0',
    }),
  importado: z.enum(['si', 'no']),
  proveedorId: z.string().regex(objectIdRegex, {
    message: 'Debe elegir un proveedor',
  }),
  almacenId: z.string().regex(objectIdRegex, {
    message: 'Debe elegir un almacen',
  }),
});
